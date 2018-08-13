package actions

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGraph(t *testing.T) {
	r := gin.Default()
	r.POST("/x/graph", Graph)

	w := httptest.NewRecorder()
  body := make(map[string]interface{})
  body["query"] = `query {
    authentication(name:"", pwd:"") {
      name, token, expire
    }
  }`
  d, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/x/graph", bytes.NewBuffer(d))
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Error("status not 200")
	}
	t.Error(w.Body.String())
}

func TestGraph2(t *testing.T) {
	r := gin.Default()
	r.POST("/x/graph", Graph)

	w := httptest.NewRecorder()
	body := make(map[string]interface{})
	body["query"] = `query {
    report(year:2018, week:32) {
      year, week, 
      details {
        year, week, project, task, reporter, requester, time
      }
    }
}`
	d, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/x/graph", bytes.NewReader(d))
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Error("status not 200")
	}
	t.Error(w.Body.String())
}
