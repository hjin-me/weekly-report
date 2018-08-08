import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Report, Work } from '../project';
import { WeekService } from '../week.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-page-write',
  templateUrl: './page-write.component.html',
  styleUrls: ['./page-write.component.css']
})
export class PageWriteComponent implements OnInit {
  report: Report;
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    if (!this.report) {
      this.report = this.reportService.create();
    }
    this.checkLastWork();
  }

  addWork() {}
  checkLastWork() {
    if (this.report.works.length === 0) {
      this.report.works.push(this.reportService.createWork());
      return;
    }
    const last = this.report.works[this.report.works.length - 1];
    if (last.project) {
      this.report.works.push(this.reportService.createWork());
    }
  }
}
