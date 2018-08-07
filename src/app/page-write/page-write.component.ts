import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-write',
  templateUrl: './page-write.component.html',
  styleUrls: ['./page-write.component.css']
})
export class PageWriteComponent implements OnInit {
  head = [
    {
      name: '',
      key: 'project',
      span: 4
    },
    {
      name: '',
      key: 'work',
      span: 6
    },
    {
      name: '工时',
      key: 'time',
      span: 8
    },
    {
      name: '',
      key: 'problem',
      span: 6
    }
  ];
  works = [
    {
      project: '!2312312',
      problem: 'asdfjklasdfjlkasdjfklasjdlkf',
      time: [1, 2, 3, 4, 5],
      work: '1234jkl123j4kl312j4kl32'
    },
    {
      project: '!2312312',
      problem: 'asdfjklasdfjlkasdjfklasjdlkf',
      time: [1, 2, 3, 4, 5],
      work: '1234jkl123j4kl312j4kl32'
    },
    {
      project: '!2312312',
      problem: 'asdfjklasdfjlkasdjfklasjdlkf',
      time: [1, 2, 3, 4, 5],
      work: '1234jkl123j4kl312j4kl32'
    }
  ];
  projects = [
    {
      id: '123123123',
      name: 'project A'
    },
    {
      id: '223344',
      name: 'ProjectB'
    },
    {
      id: '335577',
      name: 'C'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
