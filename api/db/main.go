package db

import (
	"database/sql"
	"os"
	"sync"

	"github.com/hjin-me/oublie/api/logex"
	_ "github.com/lib/pq"
)

var dbOnce sync.Once
var db *sql.DB

func GetDB() *sql.DB {
	dbOnce.Do(func() {
		var err error
		dsn := os.Getenv("DB_DSN")
		driver := os.Getenv("DB_DRIVER")
		db, err = sql.Open(driver, dsn)
		if err != nil {
			logex.Fatal("open db server failed. ", err)
		}
		err = db.Ping()
		if err != nil {
			logex.Fatalf("ping db failed. [%v]\n", err)
		}
	})
	return db
}

var queryOneWeeklyStmt *sql.Stmt
var queryReportStmt *sql.Stmt

func init() {
	ensureUserTable()
	ensureWeeklyTable()
	var err error
	db := GetDB()
	queryOneWeeklyStmt, err = db.Prepare(`select data from c.weekly where year=$1 and week=$2 and name=$3`)
	if err != nil {
		logex.Fatalf("sql prepare failed. [%v]", err)
	}
	queryReportStmt, err = db.Prepare(`select name, data from c.weekly where year=$1 and week=$2`)
	if err != nil {
		logex.Fatalf("sql prepare failed. [%v]", err)
	}
}
