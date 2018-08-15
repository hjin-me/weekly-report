package db

import (
	"encoding/json"
	"github.com/hjin-me/weekly-report/api/logex"
)

type Project struct {
	Id    string   `json:"id"`
	Name  string   `json:"name"`
	Tasks []string `json:"tasks"`
}

func QueryAllProjects() ([]Project, error) {
	rows, err := queryAllProjectStmt.Query()
	if err != nil {
		logex.Warningf("query all project failed. [%v]", err)
		return nil, err
	}

	defer rows.Close()
	var allProj []Project
	for rows.Next() {
		var tasks []byte
		p := Project{}
		if err := rows.Scan(&p.Id, &p.Name, &tasks); err != nil {
			logex.Warningf("query projects, scan failed. [%v]", err)
			return nil, err
		}
		err = json.Unmarshal(tasks, &p.Tasks)
		if err != nil {
			logex.Warningf("project tasks in database is illegal. [%v]", err)
			p.Tasks = []string{}
		}
		allProj = append(allProj, p)
	}
	return allProj, nil
}