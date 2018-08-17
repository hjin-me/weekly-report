package db

import (
	"database/sql"
	"os"
	"sync"

	"encoding/json"
	"fmt"
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
var queryAllProjectStmt *sql.Stmt

func init() {
	var err error
	ensureTable("c", "user", []string{
		`create table "c"."user"(
    id varchar(50) PRIMARY KEY,
    name varchar(50),
    team varchar(50)
		)`,
		`CREATE INDEX user_team_index ON c."user" (team)`,
	})
	ensureTable("c", "weekly", []string{
		`create table "c"."weekly"(
        year int NOT NULL,
				week int NOT NULL,
				name varchar(30) NOT NULL,
				data json,
				CONSTRAINT weekly_pk PRIMARY KEY (year, week, name)
				)`,
		`CREATE INDEX weekly_name_index ON c.weekly (name)`,
	})
	var ps []Project
	err = json.Unmarshal([]byte(`[{"id":"1031601","name":"Insight1.0","tasks":["产品设计","研发","测试","运营"]},{"id":"1031701","name":"Insight2.0+killbox","tasks":["产品设计","研发","测试","运营"]},{"id":"1031801","name":"WiFi一体化","tasks":["产品设计","研发","测试","运营"]},{"id":"1031802","name":"Agg2.0","tasks":["产品设计","研发","测试","运营"]},{"id":"1221701","name":"S9","tasks":["产品设计","研发","测试","运营"]},{"id":"B030001","name":"大数据服务基础运维和优化","tasks":["基础运维","基础研发","安全能力"]},{"id":"B030002","name":"引擎日志回收服务","tasks":["基础运维","基础研发","安全能力"]},{"id":"B030003","name":"特征分发服务","tasks":["基础运维","基础研发","安全能力"]},{"id":"B030004","name":"基础数据获取能力运维","tasks":["基础运维","基础研发","安全能力"]},{"id":"B030005","name":"大数据分析计算平台解决方案基础研发","tasks":["基础运维","基础研发","安全能力"]},{"id":"B030006","name":"流式处理平台","tasks":["基础运维","基础研发","安全能力"]},{"id":"B030007","name":"数据仓库和部分基础数据集市研发\t","tasks":["基础运维","基础研发","安全能力"]},{"id":"B220001","name":"情报分析能力提升研究","tasks":["基础运维","基础研发","安全能力"]},{"id":"X031801","name":"产品/项目 调研分析","tasks":["技术研究","商业研究"]},{"id":"X031802","name":"流量大数据架构和算法预研","tasks":["技术研究","商业研究"]},{"id":"X031803","name":"算法预研和部署","tasks":["技术研究","商业研究"]},{"id":"X031804","name":"Darwin标签体系研发","tasks":["技术研究","商业研究"]},{"id":"X031805","name":"大数据业务基础解决方案预研","tasks":["技术研究","商业研究"]},{"id":"X221801","name":"新产品预研","tasks":["技术研究","商业研究"]}]`), &ps)
	if err != nil {
		logex.Fatalf("project init data failed. [%v]", err)
	}
	initData := `insert into "c"."project" ("id", "name", "tasks") values `
	for i, p := range ps {
		if i != 0 {
			initData = initData + ","
		}
		t, err := json.Marshal(p.Tasks)
		if err != nil {
			logex.Fatalf("json marshal error. [%v]", err)
		}
		initData = fmt.Sprintf("%s ('%s', '%s', '%s')", initData, p.Id, p.Name, t)
	}

	ensureTable("c", "project", []string{
		`CREATE TABLE c.project (
    id varchar(30) PRIMARY KEY,
    name varchar(50),
    tasks json
);`,
		initData,
	})
	db := GetDB()
	queryOneWeeklyStmt, err = db.Prepare(`select data from c.weekly where year=$1 and week=$2 and name=$3`)
	if err != nil {
		logex.Fatalf("sql prepare failed. [%v]", err)
	}
	queryReportStmt, err = db.Prepare(`select name, data from c.weekly where year=$1 and week=$2`)
	if err != nil {
		logex.Fatalf("sql prepare failed. [%v]", err)
	}
	queryAllProjectStmt, err = db.Prepare(`select id, name, tasks from c.project`)
	if err != nil {
		logex.Fatalf("sql prepare failed. [%v]", err)
	}
}

func ensureTable(schemaName, tableName string, query []string) {
	db := GetDB()
	var fieldName string
	err := db.QueryRow(`select schema_name from information_schema.schemata where schema_name=$1`, schemaName).Scan(&fieldName)
	switch {
	case err == sql.ErrNoRows:
		// create schema
		logex.Infof("create schema [%v]", schemaName)
		_, err = db.Exec(fmt.Sprintf(`CREATE SCHEMA %s`, schemaName))
		if err != nil {
			logex.Fatalf("create schema [%s] failed. [%v]", schemaName, err)
		}
	case err != nil:
		logex.Fatalf("check schema [%s] failed. [%v]", schemaName, err)
	default:
		// next
	}
	err = db.QueryRow("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname=$1 AND tablename=$2", schemaName, tableName).Scan(&fieldName)
	switch {
	case err == sql.ErrNoRows:
		// create table
		logex.Infof("create table [%s].", tableName)
	case err != nil:
		logex.Fatalf("check table [%s] failed. [%v]", tableName, err)
	default:
		logex.Infof("table [%s] exist.", tableName)
		return
	}

	for step, q := range query {
		// create table
		_, err = db.Exec(q)
		if err != nil {
			logex.Fatalf("create table %s [step:%d] failed. [%v]", tableName, step, err)
		}
	}
	logex.Infof("table [%s] create success.", tableName)
	return
}
