package main

import (
	"github.com/gin-gonic/gin"
  "git.avlyun.org/inf/weekly/api/actions"
  "git.avlyun.org/inf/weekly/api/static"
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
	r.Run("0.0.0.0:8787") // listen and serve on 0.0.0.0:8787
}
