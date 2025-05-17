package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dsn := "${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(mathsys-site-mysql-1:3306)/mathsys_db?charset=utf8mb4&parseTime=True&loc=Asia%2FTokyo"

	e := gin.Default()
	e.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "success",
		})
	})

	e.Run(":8000")
}