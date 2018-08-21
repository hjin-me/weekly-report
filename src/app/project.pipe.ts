import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {
  transform(id: string, projects: Project[]): any {
    const project = projects.find(p => p.id === id);
    return project ? project.name : '';
  }
}
