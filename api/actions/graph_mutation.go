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
	},
})
