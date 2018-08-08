import { Injectable } from '@angular/core';
import { Project } from './project';
import { Projects } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() {}

  getProjects(): Project[] {
    return Projects;
  }
}
