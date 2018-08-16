package actions

import (
	"github.com/graphql-go/graphql"
	"github.com/hjin-me/weekly-report/api/actions/types"
)

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields{
		"saveWeekly": &graphql.Field{
			Type: graphql.NewNonNull(types.WeeklyType),
			Args: graphql.FieldConfigArgument{
				"weekly": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(types.WeeklyInput),
				},
			},
			Resolve: types.SaveWeeklyResolver,
		},
		"modifyTeam": &graphql.Field{
			Type: graphql.String,
			Args: graphql.FieldConfigArgument{
				"team": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: types.MutationTeamResolver,
		},
		"saveProject": &graphql.Field{
			Type: graphql.Boolean,
			Args: graphql.FieldConfigArgument{
				"project": &graphql.ArgumentConfig{
					Type: types.ProjectInput,
				},
			},
			Resolve: types.ProjectSaveResolver,
		},
	},
})
