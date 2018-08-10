package types

import (
  "github.com/graphql-go/graphql"
)

var WeeklyType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Weekly",
  Fields: graphql.Fields{
    "week": &graphql.Field{
      Type: graphql.NewNonNull(WeekType),
    },
    "reporter": &graphql.Field{
      Type: ReporterType,
    },
    "works": &graphql.Field{
      Type: graphql.NewNonNull(graphql.NewList(WorkType)),
    },
  },
})
var WeeklyInput = graphql.NewInputObject(graphql.InputObjectConfig{
  Name: "WeeklyInput",
  Fields: graphql.InputObjectConfigFieldMap{
    "week": &graphql.InputObjectFieldConfig{
      Type: graphql.NewNonNull(WeekInput),
    },
    "reporter": &graphql.InputObjectFieldConfig{
      Type: ReporterInput,
    },
    "works": &graphql.InputObjectFieldConfig{
      Type: graphql.NewNonNull(graphql.NewList(WorkInput)),
    },
  },
})
var WorkInput = graphql.NewInputObject(graphql.InputObjectConfig{
  Name: "WorkInput",
  Fields: graphql.InputObjectConfigFieldMap{
    "project":   &graphql.InputObjectFieldConfig{Type: graphql.String},               // 项目 ID
    "task":      &graphql.InputObjectFieldConfig{Type: graphql.String},               // 项目的任务模块
    "requester": &graphql.InputObjectFieldConfig{Type: graphql.String},               // 需求者
    "problem":   &graphql.InputObjectFieldConfig{Type: graphql.String},               // 遇到的问题
    "time":      &graphql.InputObjectFieldConfig{Type: graphql.NewList(graphql.Int)}, // 一周的工时
    "work":      &graphql.InputObjectFieldConfig{Type: graphql.String},               // 工作内容
  },
})
var WorkType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Work",
  Fields: graphql.Fields{
    "project":   &graphql.Field{Type: graphql.String},               // 项目 ID
    "task":      &graphql.Field{Type: graphql.String},               // 项目的任务模块
    "requester": &graphql.Field{Type: graphql.String},               // 需求者
    "problem":   &graphql.Field{Type: graphql.String},               // 遇到的问题
    "time":      &graphql.Field{Type: graphql.NewList(graphql.Int)}, // 一周的工时
    "work":      &graphql.Field{Type: graphql.String},               // 工作内容
  },
})
var WeekType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Week",
  Fields: graphql.Fields{
    "year": &graphql.Field{
      Type: graphql.NewNonNull(graphql.Int),
    },
    "week": &graphql.Field{
      Type: graphql.NewNonNull(graphql.Int),
    },
  },
})
var WeekInput = graphql.NewInputObject(graphql.InputObjectConfig{
  Name: "WeekInput",
  Fields: graphql.InputObjectConfigFieldMap{
    "year": &graphql.InputObjectFieldConfig{
      Type: graphql.NewNonNull(graphql.Int),
    },
    "week": &graphql.InputObjectFieldConfig{
      Type: graphql.NewNonNull(graphql.Int),
    },
  },
})
var ReporterType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Reporter",
  Fields: graphql.Fields{
    "name": &graphql.Field{
      Type: graphql.String,
    },
  },
})
var ReporterInput = graphql.NewInputObject(graphql.InputObjectConfig{
  Name: "ReporterInput",
  Fields: graphql.InputObjectConfigFieldMap{
    "name": &graphql.InputObjectFieldConfig{
      Type: graphql.String,
    },
  },
})
