package types

import "github.com/graphql-go/graphql"

var ReportType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Report",
	Fields: graphql.Fields{
		"year": &graphql.Field{
			Type: graphql.Int,
		},
		"week": &graphql.Field{
			Type: graphql.Int,
		},
		"details": &graphql.Field{
			Type: graphql.NewList(ReportRowType),
		},
	},
})

var ReportRowType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ReportRow",
	Fields: graphql.Fields{
		"year":      &graphql.Field{Type: graphql.Int},
		"week":      &graphql.Field{Type: graphql.Int},
    "task":      &graphql.Field{Type: graphql.String},
		"project":   &graphql.Field{Type: graphql.String},
		"team":      &graphql.Field{Type: graphql.String},
		"reporter":  &graphql.Field{Type: graphql.String},
		"requester": &graphql.Field{Type: graphql.String},
		"time":      &graphql.Field{Type: graphql.Float},
		"info":      &graphql.Field{Type: graphql.String},
	},
})

