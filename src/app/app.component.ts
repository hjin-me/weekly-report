import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weekly-report';
  head = [
    {
      name: '项目编号',
      key: 'project',
      span: 4
    },
    {
      name: '工作内容',
      key: 'work',
      span: 6
    },
    {
      name: '工时',
      key: 'time',
      span: 8
    },
    {
      name: '问题',
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
}
