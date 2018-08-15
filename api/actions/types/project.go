package types

import (
	"github.com/graphql-go/graphql"
	"github.com/hjin-me/weekly-report/api/db"
)

var ProjectType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Project",
	Fields: graphql.Fields{
		"id":    &graphql.Field{Type: graphql.String},
		"name":  &graphql.Field{Type: graphql.String},
		"tasks": &graphql.Field{Type: graphql.NewList(graphql.String)},
	},
})

var ProjectInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "ProjectInput",
	Fields: graphql.InputObjectFieldMap{
		"id":    &graphql.InputObjectField{Type: graphql.String},
		"name":  &graphql.InputObjectField{Type: graphql.String},
		"tasks": &graphql.InputObjectField{Type: graphql.NewList(graphql.String)},
	},
})

func ProjectResolver(params graphql.ResolveParams) (interface{}, error) {
	rows, err := db.QueryAllProjects()
	if err != nil {
		return nil, err
	}
	return rows, nil
}
