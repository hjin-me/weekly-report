import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../../project';

@Pipe({
  name: 'task'
})
export class TaskPipe implements PipeTransform {
  transform(id: string, projects: Project[]): string[] {
    const project = projects.find(p => p.id === id);
    return project ? project.tasks : [];
  }
}
