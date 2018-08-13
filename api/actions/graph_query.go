package actions

import (
	"github.com/graphql-go/graphql"
	"github.com/hjin-me/weekly-report/api/actions/types"
)

// query
var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
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
		"weekly": &graphql.Field{
			Type: types.WeeklyType,
			Args: graphql.FieldConfigArgument{
				"year": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
				"week": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: types.QueryWeeklyResolver,
		},
		"report": &graphql.Field{
			Type: types.ReportType,
			Args: graphql.FieldConfigArgument{
				"year": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
				"week": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: types.QueryReportResolver,
		},

		"hello": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return "world", nil
			},
		},
	},
})
