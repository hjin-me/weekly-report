export interface Project {
  id: string;
  name: string;
  tasks: string[];
}
export interface Work {
  project: string; // 项目 ID
  task: string; // 项目的任务模块
  requester: string; // 需求者
  problem: string; // 遇到的问题
  time: number[]; // 一周的工时
  work: string; // 工作内容
}
