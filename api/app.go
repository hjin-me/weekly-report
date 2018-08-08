package main

import (
	"github.com/gin-gonic/gin"
	"github.com/hjin-me/weekly-report/api/actions"
	"github.com/hjin-me/weekly-report/api/static"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.POST("/x/graph", actions.Graph)
	static.ServerStatics(r)
	r.Run("127.0.0.1:8787") // listen and serve on 0.0.0.0:8787
}
