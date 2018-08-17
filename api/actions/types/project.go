package types

import (
  "github.com/graphql-go/graphql"
  "github.com/hjin-me/weekly-report/api/db"
  "github.com/mitchellh/mapstructure"
  "errors"
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
  Fields: graphql.InputObjectConfigFieldMap{
    "id":    &graphql.InputObjectFieldConfig{Type: graphql.String},
    "name":  &graphql.InputObjectFieldConfig{Type: graphql.String},
    "tasks": &graphql.InputObjectFieldConfig{Type: graphql.NewList(graphql.String)},
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
