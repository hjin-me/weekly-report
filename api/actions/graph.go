package actions

import (
	"context"
	"encoding/json"
	"git.avlyun.org/inf/weekly/api/actions/types"
	"git.avlyun.org/inf/weekly/api/logex"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"io/ioutil"
	"net/http"
)

type GraphReq struct {
	Query     string                 `json:"query"`
	Variables map[string]interface{} `json:"variables,omitempty"`
}

func Graph(c *gin.Context) {
	// auth
	userName, err := types.AuthUserName(c.Request)
	if err != nil {
		logex.Infof("auth token illegal. [%v]", err)
	}
	logex.Debugf("current user is [%s]", userName)

	// mutation
	schemaConfig := graphql.SchemaConfig{Query: rootQuery, Mutation: rootMutation}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		logex.Warningf("failed to create new schema, error: %v", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	reqBody, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		logex.Warningf("read request failed: %v", err)
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	var reqObj GraphReq
	err = json.Unmarshal(reqBody, &reqObj)
	if err != nil {
		logex.Warningf("request json illegal: %v", err)
		c.AbortWithError(http.StatusBadRequest, err)
		//c.JSON(http.StatusBadRequest, r)
		return
	}

	// Query
	params := graphql.Params{
		Schema:         schema,
		RequestString:  reqObj.Query,
		VariableValues: reqObj.Variables,
		Context:        context.WithValue(context.Background(), "username", userName),
	}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		logex.Warningf("failed to execute graphql operation, errors: %v", r.Errors)
		//c.AbortWithError(http.StatusInternalServerError, r.Errors[0])
		c.JSON(http.StatusInternalServerError, r)
		return
	}
	c.JSON(http.StatusOK, r)
}
