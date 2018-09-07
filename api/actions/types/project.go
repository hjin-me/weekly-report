package types

import (
	"errors"
	"git.avlyun.org/inf/weekly/api/db"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

var ProjectType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Project",
	Fields: graphql.Fields{
		"id":    &graphql.Field{Type: graphql.String},
		"name":  &graphql.Field{Type: graphql.String},
		"order": &graphql.Field{Type: graphql.Int},
		"tasks": &graphql.Field{Type: graphql.NewList(graphql.String)},
	},
})

var ProjectInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "ProjectInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"id":    &graphql.InputObjectFieldConfig{Type: graphql.NewNonNull(graphql.String)},
		"name":  &graphql.InputObjectFieldConfig{Type: graphql.NewNonNull(graphql.String)},
		"order": &graphql.InputObjectFieldConfig{Type: graphql.Int},
		"tasks": &graphql.InputObjectFieldConfig{Type: graphql.NewNonNull(graphql.NewList(graphql.String))},
	},
})

func ProjectResolver(params graphql.ResolveParams) (interface{}, error) {
	rows, err := db.QueryAllProjects()
	if err != nil {
		return nil, err
	}
	return rows, nil
}

func ProjectSaveResolver(params graphql.ResolveParams) (interface{}, error) {
	var project db.Project
	err := mapstructure.Decode(params.Args["project"], &project)
	if err != nil {
		return false, err
	}
	if project.Id == "" || project.Name == "" {
		return false, errors.New("id or name must not empty")
	}
	err = db.SaveProject(project)
	if err != nil {
		return false, err
	}
	return true, nil
}
func ProjectDeleteResolver(params graphql.ResolveParams) (interface{}, error) {
	name, ok := params.Context.Value("username").(string)
	if !ok {
		return false, nil
	}
	if name != "huangjin" || name != "wangchao" {
		return false, nil
	}
	id, ok := params.Args["id"].(string)
	if !ok {
		return false, errors.New("missing id")
	}
	err := db.DeleteProject(id)
	if err != nil {
		return false, err
	}
	return true, nil
}
