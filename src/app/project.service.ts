import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }

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
}
