import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.css']
})
export class WorkTimeComponent implements OnInit {
  @Input()
  value: number[];
  @Output()
  valueChange = new EventEmitter<number[]>();

  @Input()
  year: number;
  @Input()
  week: number;
  weekTitle: string[] = [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日'
  ];
  firstDay: Date;
  constructor() {}

  ngOnInit() {
    const d = moment()
      .year(2017)
      .week(1)
      .day(1);
    this.firstDay = d.toDate();
    console.log(this.value);
  }

  timeChange(index: number, v: number | string) {
    const t = [...this.value];
    t[index] = typeof v !== 'number' ? Number.parseInt(v, 10) : v;
    this.valueChange.emit(t);
  }
}
