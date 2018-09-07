package db

import (
	"encoding/json"
	"git.avlyun.org/inf/weekly/api/logex"
)

type ReportRow struct {
	Year      int    `json:"year"`
	Week      int    `json:"week"`
	Project   string `json:"project"`
	Task      string `json:"task"`
	Team      string `json:"team"`
	Reporter  string `json:"reporter"`
	Requester string `json:"requester"`
	Time      int    `json:"time"`
	Info      string `json:"info"`
	Problem   string `json:"problem"`
}

type Report struct {
	Year    int         `json:"year"`
	Week    int         `json:"week"`
	Details []ReportRow `json:"details"`
}

func QueryWeekReport(year, week int) (collections []ReportRow, err error) {
	rows, err := queryReportStmt.Query(year, week)
	if err != nil {
		logex.Warningf("query failed, [%v]", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var name string
		var data []byte
		if err := rows.Scan(&name, &data); err != nil {
			logex.Warningf("scan failed, [%v]", err)
			return nil, err
		}
		var w Weekly
		err = json.Unmarshal(data, &w)
		if err != nil {
			return nil, err
		}
		for _, task := range w.Works {
			collections = append(collections, ReportRow{
				Year:      w.Week.Year,
				Week:      w.Week.Week,
				Project:   task.Project,
				Task:      task.Task,
				Team:      w.Reporter.Team,
				Reporter:  w.Reporter.Name,
				Requester: task.Requester,
				Time:      sumTime(task.Time),
				Info:      task.Work,
				Problem:   task.Problem,
			})
		}
	}

	return collections, nil
}

func sumTime(time []int) int {
	var total int
	for _, t := range time {
		total += t
	}
	return total
}
