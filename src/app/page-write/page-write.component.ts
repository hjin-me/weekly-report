import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Work } from '../project';

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
  works: Work[] = [
    {
      project: '',
      problem: '',
      time: [],
      work: '',
      task: '',
      requester: ''
    },
    {
      project: '',
      problem: '',
      time: [1, 2, 3, 4, 5],
      work: '',
      task: '',
      requester: ''
    },
    {
      project: '!2312312',
      problem: '',
      time: [],
      work: '',
      task: '',
      requester: ''
    }
  ];
  projects: Project[] = [];
  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }
}
