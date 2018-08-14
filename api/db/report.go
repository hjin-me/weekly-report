package db

import (
		"encoding/json"
	"github.com/hjin-me/weekly-report/api/logex"
)


type ReportRow struct {
	Year      int     `json:"year"`
	Week      int     `json:"week"`
	Project   string  `json:"project"`
	Task      string  `json:"task"`
	Team      string  `json:"team"`
	Reporter  string  `json:"reporter"`
	Requester string  `json:"requester"`
	Time      float32 `json:"time"`
	Info      string  `json:"info"`
}

type Report struct {
	Year    int         `json:"year"`
	Week    int         `json:"week"`
	Details []ReportRow `json:"details"`
}

func prepareQueryReport() {
	once.Do(func() {
		var err error
		db := GetDB()
		queryReportStmt, err = db.Prepare(`select name, data from c.weekly where year=$1 and week=$2`)
		if err != nil {
			logex.Fatalf("sql prepare failed. [%v]", err)
		}
	})
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
			})
		}
	}

	return collections, nil
}

func sumTime(time []int) float32 {
	var total int
	for _, t := range time {
		total += t
	}
	return float32(total) / 8
}
