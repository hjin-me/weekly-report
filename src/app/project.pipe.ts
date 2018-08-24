import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {
  transform(id: string, projects$: BehaviorSubject<Project[]>): any {
    const projects = projects$.getValue();
    const project = projects.find(p => p.id === id);
    return project ? project.name : '';
  }
}
