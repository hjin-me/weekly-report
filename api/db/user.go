package db

import (
	"database/sql"
	"github.com/hjin-me/weekly-report/api/logex"
)

func init() {
	ensureUserTable()
}

func ensureUserTable() {
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
	err = db.QueryRow("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='c' AND tablename='user'").Scan(&fieldName)
	switch {
	case err == sql.ErrNoRows:
		// create table
		logex.Info("create table [user].")
	case err != nil:
		logex.Fatalf("check [user] weekly failed. [%v]", err)
	default:
		logex.Info("table [user] exist.")
		return
	}

	// create table
	_, err = db.Exec(`create table "c"."user"(
    id varchar(50) PRIMARY KEY,
    name varchar(50),
    team varchar(50)
		)`)
	if err != nil {
		logex.Fatalf("create weekly table failed. [%v]", err)
	}
	// create index
	_, err = db.Exec(`CREATE INDEX user_team_index ON c."user" (team)`)
	if err != nil {
		logex.Fatalf("create weekly index failed. [%v]", err)
	}
	logex.Info("weekly table create success.")
}

func SaveUser(id, name, team string) error {
	_, err := db.Exec(`insert into "c"."user" ("id", "name",  "team") values
  	($1, $2, $3 )
    ON CONFLICT ("id")
    DO UPDATE 
    SET "name" = EXCLUDED.name, "team" = EXCLUDED.team;
  	`, id, name, team)
	if err != nil {
		logex.Warningf("insert weekly failed. [%v]", err)
	}
	return err
}
