package db

import (
	"database/sql"
	"sync"

	"encoding/json"
	"github.com/hjin-me/oublie/api/logex"
)

var once sync.Once

type Week struct {
	Year int `json:"year"`
	Week int `json:"week"`
}
type Work struct {
	Project   string `json:"project"`
	Task      string `json:"task"`
	Requester string `json:"requester"`
	Problem   string `json:"problem"`
	Time      []int  `json:"time"`
	Work      string `json:"work"`
}
type Reporter struct {
	Id   string `json:"-"`
	Name string `json:"name"`
	Team string `json:"team"`
}

type Weekly struct {
	Week     Week     `json:"week"`     // 第几周
	Works    []Work   `json:"works"`    // 工作内容
	Reporter Reporter `json:"reporter"` // 周报汇报人
}

//func ValidateUser(openId string) bool {
//	var dbOpenId string
//	var ss int
//	err := stmt.QueryRow(openId).Scan(&dbOpenId, &ss)
//	if err != nil {
//		if err == sql.ErrNoRows {
//			return false
//		}
//		logex.Warningf("sql query failed. [%v]\n", err)
//		return false
//	}
//	if ss != 0 {
//		return true
//	}
//	return false
//}
func prepareQueryOneWeekly() {
	once.Do(func() {
		var err error
		db := GetDB()
		queryOneWeeklyStmt, err = db.Prepare(`select data from c.weekly where year=$1 and week=$2 and name=$3`)
		if err != nil {
			logex.Fatalf("sql prepare failed. [%v]", err)
		}
	})
}

func ensureWeeklyTable() {
	db := GetDB()
	var fieldName string
	err := db.QueryRow(`select schema_name from information_schema.schemata where schema_name='c'`).Scan(&fieldName)
	switch {
	case err == sql.ErrNoRows:
		// create schema
		logex.Info("create schema c")
		_, err = db.Exec(`CREATE SCHEMA c`)
		if err != nil {
			logex.Fatalf("create schema c failed. [%v]", err)
		}
	case err != nil:
		logex.Fatalf("check schema c failed. [%v]", err)
	default:
		// next
	}
	err = db.QueryRow("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='c' AND tablename='weekly'").Scan(&fieldName)
	switch {
	case err == sql.ErrNoRows:
		// create table
		logex.Info("create table weekly.")
	case err != nil:
		logex.Fatalf("check table weekly failed. [%v]", err)
	default:
		logex.Info("table weekly exist.")
		return
	}

	// create table
	_, err = db.Exec(`create table "c"."weekly"(
        year int NOT NULL,
				week int NOT NULL,
				name varchar(30) NOT NULL,
				data json,
				CONSTRAINT weekly_pk PRIMARY KEY (year, week, name)
				)`)
	if err != nil {
		logex.Fatalf("create weekly table failed. [%v]", err)
	}
	// create index
	_, err = db.Exec(`CREATE INDEX weekly_name_index ON c.weekly (name)`)
	if err != nil {
		logex.Fatalf("create weekly index failed. [%v]", err)
	}
	logex.Info("weekly table create success.")
}

func OverwriteWeekly(weekly Weekly) error {
	data, err := json.Marshal(weekly)
	if err != nil {
		return err
	}
	_, err = db.Exec(`insert into "c"."weekly" ("year", "week", "name", "data") values
  	($1, $2, $3, $4)
    ON CONFLICT ("year", "week", "name") 
    DO UPDATE 
    SET "data" = EXCLUDED.data;
  	`, weekly.Week.Year, weekly.Week.Week, weekly.Reporter.Id, data)
	if err != nil {
		logex.Infof("weekly is [%v]", weekly)
		logex.Fatalf("insert weekly failed. [%v]", err)
	}
	return err
}

func QueryOneWeekly(year, week int, name string) (w Weekly, err error) {
	var data []byte
	err = queryOneWeeklyStmt.QueryRow(year, week, name).Scan(&data)
	if err != nil {
		logex.Infof("query weekly failed [%v]", err)
		return
	}

	err = json.Unmarshal(data, &w)
	if err != nil {
		logex.Infof("json unmarshal failed [%v]", err)
		return
	}

	return
}
