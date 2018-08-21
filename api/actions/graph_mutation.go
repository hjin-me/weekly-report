package actions

import (
	"git.avlyun.org/inf/weekly/api/actions/types"
	"github.com/graphql-go/graphql"
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
				"force": &graphql.ArgumentConfig{
					Type:         graphql.Boolean,
					DefaultValue: false,
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
