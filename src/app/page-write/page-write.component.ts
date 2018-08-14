import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Weekly } from '../project';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-page-write',
  templateUrl: './page-write.component.html',
  styleUrls: ['./page-write.component.css']
})
export class PageWriteComponent implements OnInit {
  report: Weekly;
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
    this.reportService.thisWeekly().subscribe(report => {
      this.report = report;
      this.checkLastWork();
    });
    this.checkLastWork();
  }

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

  submit() {
    const report = JSON.parse(JSON.stringify(this.report));
    report.works = report.works.filter(w => !!w.project);
    this.reportService.save(report).subscribe(d => alert('success'));
  }
}
