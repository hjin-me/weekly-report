import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  disabled: boolean;
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

  constructor() {
  }

  ngOnInit() {
  }

  timeChange(index: number, v: number | string) {
    const t = [...this.value];
    t[index] = typeof v !== 'number' ? Number.parseInt(v, 10) : v;
    this.valueChange.emit(t);
  }
}
