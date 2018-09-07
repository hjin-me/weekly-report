package db

import (
	"encoding/json"
	"git.avlyun.org/inf/weekly/api/logex"
)

type Project struct {
	Id    string   `json:"id"`
	Name  string   `json:"name"`
	Order int      `json:"order"`
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
		if err := rows.Scan(&p.Id, &p.Name, &p.Order, &tasks); err != nil {
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

func SaveProject(project Project) error {
	data, err := json.Marshal(project.Tasks)
	if err != nil {
		return err
	}
	_, err = db.Exec(`insert into "c"."project" ("id", "name", "tasks") values
  	($1, $2, $3)
    ON CONFLICT ("id") 
    DO UPDATE 
    SET "name" = EXCLUDED.name, "tasks" = EXCLUDED.tasks;
  	`, project.Id, project.Name, data)
	if err != nil {
		logex.Warningf("insert project failed. [%v]", err)
	}
	return err
}

func DeleteProject(projectId string) error {
	_, err := db.Exec(`delete from "c"."project" where id = $1`, projectId)
	if err != nil {
		logex.Warningf("delete project [%s] failed. [%v]", projectId, err)
	}
	return err
}
