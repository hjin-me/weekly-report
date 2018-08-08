import { Injectable } from '@angular/core';
import { Report, Work } from './project';
import { WeekService } from './week.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private weekService: WeekService) {}

  create(date?: Date): Report {
    return {
      reporter: {
        name: 'who'
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
}
