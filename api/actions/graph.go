package actions

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"github.com/hjin-me/weekly-report/api/actions/types"
	"github.com/hjin-me/weekly-report/api/logex"
	"io/ioutil"
	"net/http"
)

type GraphReq struct {
	Query     string                 `json:"query"`
	Variables map[string]interface{} `json:"variables,omitempty"`
}

func Graph(c *gin.Context) {
	// Schema
	fields := graphql.Fields{
		"authentication": &graphql.Field{
			Type: types.AuthType,
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"pwd": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: types.AuthResolver,
		},
		"hello": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return "world", nil
			},
		},
	}
	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields}
	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		logex.Warning("failed to create new schema, error: %v", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	reqBody, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		logex.Warning("read request failed: %v", err)
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	var reqObj GraphReq
	err = json.Unmarshal(reqBody, &reqObj)
	if err != nil {
		logex.Warning("request json illegal: %v", err)
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Query
	params := graphql.Params{Schema: schema, RequestString: reqObj.Query, VariableValues: reqObj.Variables}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		logex.Warning("failed to execute graphql operation, errors: %+v", r.Errors)
		c.AbortWithError(http.StatusInternalServerError, r.Errors[0])
		return
	}
	c.JSON(http.StatusOK, r)
}
