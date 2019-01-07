package types

import (
	"errors"
  "git.avlyun.org/inf/go-pkg/logex"
  "git.avlyun.org/inf/weekly/api/db"

	"github.com/graphql-go/graphql"
)

func QueryReportResolver(params graphql.ResolveParams) (interface{}, error) {
	year, ok := params.Args["year"].(int)
	if !ok {
		return nil, errors.New("params year missing")
	}
	week, ok := params.Args["week"].(int)
	if !ok {
		return nil, errors.New("params week missing")
	}
	logex.Debug("params is ", year, week)
	rows, err := db.QueryWeekReport(year, week)
	if err != nil {
		return nil, err
	}
	report := db.Report{
		Year: year, Week: week, Details: rows,
	}
	return report, nil
}
