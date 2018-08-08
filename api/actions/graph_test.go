package actions

import (
  "testing"
  "github.com/gin-gonic/gin"
  "net/http/httptest"
  "net/http"
  "bytes"
)

func TestGraph(t *testing.T) {
  r := gin.Default()
  r.POST("/x/graph", Graph)

  w := httptest.NewRecorder()
  body := `{
	"query": "{authentication(name:\"\", pwd:\"\") {name, token, expire}}"
}`
  req, _ := http.NewRequest("POST", "/x/graph", bytes.NewBufferString(body))
  r.ServeHTTP(w, req)
  if w.Code != http.StatusOK {
    t.Error("status not 200")
  }
  t.Error(w.Body.String())

}
