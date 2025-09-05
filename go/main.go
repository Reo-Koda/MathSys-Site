package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type User struct {
	UserName string `json:"user_name"`
	Password string `json:"password"`
}

type Post struct {
	PostId        int       `json:"postId"`
	UserName      string    `json:"author"`
	ClassTitle    string    `json:"class"`
	DoctorName    string    `json:"doctor"`
	Year          string    `json:"year"`
	UnderGraduate string    `json:"department"`
	Course        string    `json:"major"`
	Category      string    `json:"category"`
	Image         *string   `json:"images"`
	Memo          *string   `json:"memo"`
	PostDate      time.Time `json:"createdDay"`
}

type Tags struct {
	ClassTitle    []string `json:"class"`
	DoctorName    []string `json:"doctor"`
	Year          []string `json:"year"`
	UnderGraduate []string `json:"department"`
	Course        []string `json:"major"`
	Category      []string `json:"category"`
}

type Favorite struct {
	PostId string `json:"id"`
}

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println(".env ファイルの読み込みに失敗:", err)
	}
}

// データベースが立ち上がるのを待つ処理
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

// ログインしているのかを判断する処理
func authRequired(c *gin.Context) {
	session := sessions.Default(c)

	user := session.Get("user")
	if user == nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "ログインが必要です"})
		return
	}

	// 必要なら session.Options(...) を再度セットして「最後のアクセス日時を更新する」なども可能
	c.Set("user", user.(string))

	c.Next()
}

func appendToPosts(rows *sql.Rows) ([]Post, error) {
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
			return nil, err
		}

		posts = append(posts, p)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
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

	// 本番時には変更する
	domain := "localhost"

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // デプロイ時に修正
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	store := cookie.NewStore([]byte("secret_session_key")) // ランダムな文字列に修正する

	r.Use(sessions.Sessions("mathsys", store)) // 以降のリクエストで sessions.Default(c) を呼ぶと、 "mathsys" という名前のセッションオブジェクト（＝Cookie 内の値を読み書きできるもの）が使える。

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "success",
		})
	})

	// ユーザーがログイン状態かどうかを判断する
	r.GET("/auth/status", func(c *gin.Context) {
		session := sessions.Default(c)
		user := session.Get("user")
		if user == nil {
			c.JSON(http.StatusOK, gin.H{"isLogin": false})
			return
		}
		c.JSON(http.StatusOK, gin.H{"isLogin": true, "userName": user.(string)})
	})

	users := r.Group("/users")
	users.GET("/", func(c *gin.Context) {
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

	users.POST("/signin", func(c *gin.Context) {
		var user User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "パラメータが不正です"})
			return
		}

		// ユーザー存在有無確認
		var dbPassword string
		err := db.QueryRow("SELECT password FROM Users WHERE user_name = ?", user.UserName).Scan(&dbPassword)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "認証に失敗しました"})
			return
		} else if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// パスワード確認
		if dbPassword != user.Password {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "認証に失敗しました"})
		}

		// セッションIDの発行
		session := sessions.Default(c)
		session.Set("user", user.UserName)
		session.Options(sessions.Options{
			Path:     "/",       // Cookie のパス
			Domain:   domain,    // 本番では自分のドメインにする
			MaxAge:   3600 * 24, // 1日（秒単位）。セッションの有効期限
			HttpOnly: true,      // XSS 対策
			Secure:   false,     // 本番では true にする
			SameSite: http.SameSiteLaxMode,
		})

		// Save() を呼ぶと Cookie に暗号化されたセッションデータが書き込まれる
		if err := session.Save(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "セッション保存に失敗しました"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "ログイン成功"})
	})

	users.POST("/signup", func(c *gin.Context) {
		var newUser User
		if err := c.ShouldBindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var dbUserName string
		err := db.QueryRow("SELECT user_name FROM Users WHERE user_name = ?", newUser.UserName).Scan(&dbUserName)
		if err == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "すでに存在する名前です"})
			return
		} else if err != nil && err != sql.ErrNoRows {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		_, err = db.Exec("INSERT INTO Users (user_name, password) VALUES (?, ?)", newUser.UserName, newUser.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// セッションIDの発行
		session := sessions.Default(c)
		session.Set("user", newUser.UserName)
		session.Options(sessions.Options{
			Path:     "/",       // Cookie のパス
			Domain:   domain,    // 本番では自分のドメインにする
			MaxAge:   3600 * 24, // 1日（秒単位）。セッションの有効期限
			HttpOnly: true,      // XSS 対策
			Secure:   false,     // 本番では true にする
			SameSite: http.SameSiteLaxMode,
		})

		if err := session.Save(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "セッション保存に失敗しました"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "新規登録が正常に終了しました"})
	})

	users.POST("/signout", func(c *gin.Context) {
		session := sessions.Default(c)

		// セッション内のキーをすべてクリアする
		session.Clear()
		session.Options(sessions.Options{
			Path:     "/",    // Cookie のパス
			Domain:   domain, // 本番では自分のドメインにする
			MaxAge:   -1,     // MaxAge を -1 にすると即時 Cookie が削除される
			HttpOnly: true,   // XSS 対策
			Secure:   false,  // 本番では true にする
			SameSite: http.SameSiteLaxMode,
		})

		if err := session.Save(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "セッション破棄に失敗しました"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "ログアウトしました"})
	})

	r.GET("/posts", func(c *gin.Context) {
		rows, err := db.Query("SELECT * FROM Posts;")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		posts, err := appendToPosts(rows)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"posts": posts})
	})

	r.GET("/about", func(c *gin.Context) {
		postID := c.Query("id")
		if postID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "idを指定してください"})
			return
		}

		// rows, err := db.Query("SELECT * FROM Posts WHERE post_id = ?;", postID)
		// if err != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }
		// defer rows.Close()

		var post Post
		err := db.QueryRow("SELECT post_id, user_name, class_title, doctor_name, year_num, undergraduate, course, category, images, memo, post_date	FROM Posts WHERE post_id = ?", postID).Scan(
			&post.PostId,
			&post.UserName,
			&post.ClassTitle,
			&post.DoctorName,
			&post.Year,
			&post.UnderGraduate,
			&post.Course,
			&post.Category,
			&post.Image,
			&post.Memo,
			&post.PostDate,
		)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "対象の投稿が存在しません"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"post": post})
	})

	r.GET("/tags", func(c *gin.Context) {
		var tags Tags
		queries := []struct {
			Col   string
			Slice *[]string // スキャン先のスライス
		}{
			{"class_title", &tags.ClassTitle},
			{"doctor_name", &tags.DoctorName},
			{"year_num", &tags.Year},
			{"undergraduate", &tags.UnderGraduate},
			{"course", &tags.Course},
			{"category", &tags.Category},
		}

		for _, q := range queries {
			sqlStr := fmt.Sprintf("SELECT DISTINCT %s FROM Posts;", q.Col)
			rows, err := db.Query(sqlStr)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			for rows.Next() {
				var v string
				if err := rows.Scan(&v); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				*q.Slice = append(*q.Slice, v)
			}
			rows.Close()

			if err := rows.Err(); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"tags": tags})
	})

	authorized := r.Group("/")
	authorized.Use(authRequired)
	{
		posts := authorized.Group("/posts")
		posts.GET("/self", func(c *gin.Context) {
			user := c.GetString("user")

			rows, err := db.Query("SELECT * FROM Posts WHERE user_name = ?;", user)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer rows.Close()

			posts, err := appendToPosts(rows)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"posts": posts})
		})

		posts.POST("/post", func(c *gin.Context) {
			user := c.GetString("user")
			var newPost Post
			if err := c.ShouldBindJSON(&newPost); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			imgNull := sql.NullString{Valid: false}
			if newPost.Image != nil {
				imgNull = sql.NullString{
					String: *newPost.Image,
					Valid:  true,
				}
			}
			memoNull := sql.NullString{Valid: false}
			if newPost.Memo != nil {
				memoNull = sql.NullString{
					String: *newPost.Memo,
					Valid:  true,
				}
			}

			now := time.Now().Format("2006-01-02")

			result, err := db.Exec("INSERT INTO Posts (user_name, class_title, doctor_name, year_num, undergraduate, course, category, images, memo, post_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				user, newPost.ClassTitle, newPost.DoctorName, newPost.Year, newPost.UnderGraduate, newPost.Course, newPost.Category, imgNull, memoNull, now)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			id, err := result.LastInsertId()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "データが追加されました", "id": id})
		})

		// posts.POST("delete", func(c *gin.Context) {
		// 	user := c.GetString("user")
		// 	var deletePost Post
		// 	if err := c.ShouldBindJSON(&deletePost); err != nil {
		// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// 		return
		// 	}

		// 	tx, err := db.Begin()
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	_, err = tx.Exec("DELETE FROM Favorites", user, deletePost)  // 口座1から100を減額
		// 	if err != nil {
		// 		tx.Rollback()
		// 		log.Fatal(err)
		// 	}

		// })

		authorized.GET("/favorites", func(c *gin.Context) {
			user := c.GetString("user")

			query := `
			SELECT p.post_id, p.user_name, p.class_title, p.doctor_name,
						p.year_num, p.undergraduate, p.course,
						p.category, p.images, p.memo, p.post_date
			FROM Posts p
			INNER JOIN Favorites f ON p.post_id = f.post_id
			WHERE f.user_name = ?
			`

			rows, err := db.Query(query, user)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer rows.Close()

			posts, err := appendToPosts(rows)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"posts": posts})
		})

		authorized.POST("/favorites/in", func(c *gin.Context) {
			user := c.GetString("user")
			var newPostId Favorite
			if err := c.ShouldBindJSON(&newPostId); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			_, err := db.Exec("INSERT INTO Favorites (user_name, post_id) VALUES (?, ?)", user, newPostId.PostId)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "データが追加されました", "id": newPostId.PostId})
		})

		authorized.POST("/favorites/out", func(c *gin.Context) {
			user := c.GetString("user")
			var postId Favorite
			if err := c.ShouldBindJSON(&postId); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			result, err := db.Exec("DELETE FROM Favorites WHERE user_name = ? AND post_id = ?", user, postId.PostId)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			rowsAffected, _ := result.RowsAffected()
			if rowsAffected == 0 {
				c.JSON(http.StatusNotFound, gin.H{"message": "該当するデータがありません", "id": postId.PostId})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "データが削除されました", "id": postId.PostId})
		})

		authorized.GET("/isfavorite", func(c *gin.Context) {
			// クエリパラメータからキーワード取得
			user := c.GetString("user")
			postID := c.Query("id")
			if postID == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーと投稿を指定してください"})
				return
			}

			var id int
			err := db.QueryRow(
				`SELECT post_id FROM Favorites WHERE user_name = ? AND post_id = ?`,
				user, postID,
			).Scan(&id)

			if err != nil {
				if err == sql.ErrNoRows {
					// レコードなし → isFavorite = false
					c.JSON(http.StatusOK, gin.H{"isFavorite": false})
					return
				}
				// DBエラー
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			var author string
			err = db.QueryRow(
				`SELECT user_name FROM Posts WHERE post_id = ?`,
				id,
			).Scan(&author)

			if err != nil {
				if err == sql.ErrNoRows {
					// レコードなし → isFavorite = false
					c.JSON(http.StatusOK, gin.H{"isFavorite": false})
					return
				}
				// DBエラー
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"isFavorite": true, "author": author})
		})
	}

	if err := r.Run(":8000"); err != nil {
		log.Fatal("サーバー起動エラー:", err)
	}
}
