package types

import (
	"encoding/json"
	"errors"
	"github.com/graphql-go/graphql"
	"github.com/hjin-me/weekly-report/api/db"
	"github.com/hjin-me/weekly-report/api/logex"
	"github.com/mitchellh/mapstructure"
)

func SaveWeeklyResolver(params graphql.ResolveParams) (interface{}, error) {
	// graphql should be ok
	var weekly db.Weekly
	err := mapstructure.Decode(params.Args["weekly"], &weekly)
	if err != nil {
		logex.Debugf("params weekly is [%v]", params.Args["weekly"])
		return nil, errors.New("params weekly is illegal")
	}
	x, y := json.Marshal(weekly)
	logex.Debugf("%s %v", x, y)

	name, ok := params.Context.Value("username").(string)
	if !ok {
		logex.Infof("context username is illegal")
		return nil, errors.New("context username is illegal")
	}
	if name == "" {
		logex.Infof("context username is empty")
		return nil, errors.New("permission deny")
	}
	u, err := db.QueryUser(name)
	if err != nil {
		logex.Infof("permission deny. user is not exists [%v]", name)
		return nil, err
	}
	weekly.Reporter.Id = u.Id
	weekly.Reporter.Name = u.Name
	weekly.Reporter.Team = u.Team

	err = db.OverwriteWeekly(weekly)
	if err != nil {
		return nil, err
	}
	return weekly, nil
}

func QueryWeeklyResolver(params graphql.ResolveParams) (interface{}, error) {

	year, ok := params.Args["year"].(int)
	if !ok {
		logex.Debugf("params year is [%v]", year)
		return nil, errors.New("params year is illegal")
	}
	week, ok := params.Args["week"].(int)
	if !ok {
		logex.Debugf("params week is [%v]", week)
		return nil, errors.New("params week is illegal")
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

	w, err := db.QueryOneWeekly(year, week, name)
	return w, err
}
