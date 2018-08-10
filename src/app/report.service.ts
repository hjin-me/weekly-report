import { Injectable } from '@angular/core';
import { Weekly, Work } from './project';
import { WeekService } from './week.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private weekService: WeekService, private sessionService: SessionService, private http: HttpClient) {
  }

  create(date?: Date): Weekly {
    return {
      reporter: {
        name: this.sessionService.name
      },
      week: this.weekService.getWeekAndYear(date),
      works: []
    };
  }

  createWork(): Work {
    return {
      project: '',
      task: '',
      requester: '',
      work: '',
      time: [],
      problem: ''
    };
  }

  save(weekly: Weekly) {
    weekly.works = weekly.works.filter(w => !!w.project);
    return this.http
      .post<{ data: { saveWeekly: Weekly } }>('/x/graph', {
        query: `mutation SaveWeekly($weekly: WeeklyInput!){
	      saveWeekly(weekly:$weekly) { reporter {name}}
      }`,
        variables: {
          weekly
        }
      })
      .pipe(map(resp => resp.data.saveWeekly));
  }
}
