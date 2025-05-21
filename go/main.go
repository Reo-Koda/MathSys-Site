package main

import (
	"database/sql"
	"errors"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Post struct {
	PostId        int            `json:"postId"`
	UserName      string         `json:"author"`
	ClassTitle    string         `json:"class"`
	DoctorName    string         `json:"doctor"`
	Year          int            `json:"year"`
	UnderGraduate string         `json:"department"`
	Course        string         `json:"major"`
	Category      string         `json:"category"`
	Image         sql.NullString `json:"images"`
	Memo          sql.NullString `json:"memo"`
	PostDate      time.Time      `json:"createdDay"`
}

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println(".env ファイルの読み込みに失敗:", err)
	}
}

func waitForDatabase(db *sql.DB) error {
	const maxRetries = 10
	const delay = time.Second * 5

	for i := 0; i < maxRetries; i++ {
		err := db.Ping()
		if err == nil {
			log.Println("Database is ready!")
			return nil
		}
		log.Printf("MySQL is not ready (attempt %d/%d): %v. Retrying in %v...", i+1, maxRetries, err, delay)
		time.Sleep(delay)
	}
	return errors.New("database is not ready after several attempts")
}

func main() {
	raw := "${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(mathsys_database:3306)/mathsys_db?charset=utf8mb4&parseTime=True&loc=Asia%2FTokyo"
	dsn := os.ExpandEnv(raw)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("DB接続エラー:", err)
	}

	defer db.Close()

	if err := waitForDatabase(db); err != nil {
		log.Fatal("Pingエラー:", err)
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	e := gin.Default()

	e.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // デプロイ時に修正
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	e.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "success",
		})
	})

	e.GET("/api/users", func(c *gin.Context) {
		rows, err := db.Query("SELECT user_name, password FROM Users;")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var users []map[string]interface{}

		for rows.Next() {
			var userName string
			var password string

			if err := rows.Scan(&userName, &password); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			user := map[string]interface{}{
				"user_name": userName,
				"password":  password,
			}
			users = append(users, user)
		}

		c.JSON(http.StatusOK, gin.H{"users": users})
	})

	e.GET("/api/posts", func(c *gin.Context) {
		rows, err := db.Query("SELECT * FROM Posts;")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var posts []Post

		for rows.Next() {
			var p Post

			if err := rows.Scan(
				&p.PostId,
				&p.UserName,
				&p.ClassTitle,
				&p.DoctorName,
				&p.Year,
				&p.UnderGraduate,
				&p.Course,
				&p.Category,
				&p.Image,
				&p.Memo,
				&p.PostDate,
			); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			posts = append(posts, p)
		}

		c.JSON(http.StatusOK, gin.H{"posts": posts})
	})

	if err := e.Run(":8000"); err != nil {
		log.Fatal("サーバー起動エラー:", err)
	}
}
