package db

import (
  "testing"
  "github.com/hjin-me/weekly-report/api/actions/types"
  "encoding/json"
)

//func TestGetDB(t *testing.T) {
//  ensureWeeklyTable()
//}

func TestOverwriteWeekly(t *testing.T) {
  s1 := ` {
  "reporter": {
    "name": "who"
  },
  "week": {
    "year": 2018,
    "week": 33
  },
  "works": [
    {
      "project": "1031701",
      "task": "研发",
      "requester": "1231",
      "work": "123123",
      "time": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "problem": "123123"
    }
  ]
}`
  s2 := ` {
  "reporter": {
    "name": "who"
  },
  "week": {
    "year": 2018,
    "week": 33
  },
  "works": [
    {
      "project": "1221701",
      "task": "研发",
      "requester": "1231",
      "work": "123123",
      "time": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "problem": "123123"
    },
    {
      "project": "1031801",
      "task": "研发",
      "requester": "123123",
      "work": "sdafasfsadfas",
      "time": [
        1,
        1,
        1,
        1
      ],
      "problem": "asasdfsadf"
    }
  ]
}`
  w1 := types.Weekly{}
  w2 := types.Weekly{}
  err := json.Unmarshal([]byte(s1), &w1)
  if err != nil {
    t.Fatal(err)
  }
  err = json.Unmarshal([]byte(s2), &w2)
  if err != nil {
    t.Fatal(err)
  }
  err = OverwriteWeekly(w1)
  t.Error(err)
  err = OverwriteWeekly(w2)
  t.Error(err)
  w1.Week.Week = 34
  err = OverwriteWeekly(w1)
}
