import { Pipe, PipeTransform } from '@angular/core';
import { Weekly } from './project';

@Pipe({
  name: 'taskExist'
})
export class TaskExistPipe implements PipeTransform {
  transform(id: string, report: Weekly, projectId: string): boolean {
    const existTasks = report.works
      .filter(work => work.project === projectId)
      .map(work => work.task);
    return existTasks.findIndex(t => t === id) > -1;
  }
}
