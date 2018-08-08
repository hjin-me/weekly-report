import { Injectable } from '@angular/core';
import { Week } from './project';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  constructor() {}
  getWeekAndYear(date?: Date): Week {
    let d;
    if (date) {
      d = moment(date);
    } else {
      d = moment();
    }
    return {
      year: d.year(),
      week: d.week()
    };
  }
}
