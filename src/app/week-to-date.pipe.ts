import { Pipe, PipeTransform } from '@angular/core';
import { Week } from './project';
import * as moment from 'moment';

@Pipe({
  name: 'weekToDate'
})
export class WeekToDatePipe implements PipeTransform {
  transform(value: Week, args?: any): string {
    const d = moment();
    d.year(value.year);
    d.week(value.week);
    d.day(1);
    const r = [];
    r.push(d.format('YYYY/MM/DD'));
    d.add(6, 'd');
    r.push(d.format('YYYY/MM/DD'));
    return r.join(' ~ ');
  }
}
