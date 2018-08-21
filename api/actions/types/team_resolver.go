package types

import (
	"errors"
	"git.avlyun.org/inf/weekly/api/db"
	"git.avlyun.org/inf/weekly/api/logex"
	"github.com/graphql-go/graphql"
)

func MutationTeamResolver(params graphql.ResolveParams) (interface{}, error) {
	team, ok := params.Args["team"].(string)
	logex.Debug(team)
	if !ok {
		logex.Debugf("params team is [%v]", team)
		return nil, errors.New("params team is illegal")
	}
	name, ok := params.Context.Value("username").(string)
	if !ok {
		logex.Infof("context username is illegal")
		return nil, errors.New("context username is illegal")
	}
	if name == "" {
		logex.Infof("context username is empty")
		return nil, errors.New("permission deny")
	}

	err := db.ModifyUserTeam(name, team)
	if err != nil {
		return nil, err
	}
	return team, nil
}
