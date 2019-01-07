package db

import (
  "git.avlyun.org/inf/go-pkg/logex"
)

type User struct {
	Id   string
	Name string
	Team string
}

func SaveUser(id, name, team string) (u User, err error) {
	_, err = db.Exec(`insert into "c"."user" ("id", "name", "team") values
  	($1, $2, $3 )
    ON CONFLICT ("id")
    DO UPDATE 
    SET "name" = EXCLUDED.name;
  	`, id, name, team)
	if err != nil {
		logex.Warningf("insert weekly failed. [%v]", err)
		return
	}
	err = db.QueryRow(`select "id", "name", "team" from "c"."user" where id=$1`, id).Scan(&u.Id, &u.Name, &u.Team)
	if err != nil {
		return
	}
	return u, nil
}

func ModifyUserTeam(id, team string) error {
	_, err := db.Exec(`UPDATE "c"."user" SET "team" = $2 WHERE "id" = $1`, id, team)
	if err != nil {
		logex.Warningf("update team failed. [%v]", err)
	}
	return err
}

func QueryUser(id string) (u User, err error) {
	err = db.QueryRow(`select "id", "name", "team" from "c"."user" where id=$1`, id).Scan(&u.Id, &u.Name, &u.Team)
	if err != nil {
		logex.Warningf("query user failed. [%v]", err)
	}
	return u, err
}
