import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http
      .post<{ data: { projects: Project[] } }>('/x/graph', {
        query: `query {
	      projects {
	        id, name, tasks
	      }
      }`
      })
      .pipe(
        map(resp => {
          return resp.data.projects;
        })
      );
  }

  saveProject(project: Project): Observable<boolean> {
    return this.http
      .post<{ data: { saveProject: boolean } }>('/x/graph', {
        query: `mutation SaveProject($project: ProjectInput!) {
        saveProject(project: $project)
      }`,
        variables: {
          project
        }
      })
      .pipe(
        map(resp => {
          return resp.data.saveProject;
        })
      );
  }
  deleteProject(project: Pick<Project, 'id'>): Observable<boolean> {
    return this.http
      .post<{ data: { deleteProject: boolean } }>('/x/graph', {
        query: `mutation DeleteProject($projectId: String!) {
          deleteProject(id: $projectId)
        }`,
        variables: {
          projectId: project.id
        }
      })
      .pipe(
        map(resp => {
          return resp.data.deleteProject;
        })
      );
  }
}
