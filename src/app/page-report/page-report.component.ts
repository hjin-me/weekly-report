import { Component, OnInit } from '@angular/core';
import { Report } from '../project';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.component.html',
  styleUrls: ['./page-report.component.css']
})
export class PageReportComponent implements OnInit {
  year: number;
  week: number;
  reports = new Map<string, Report[]>();

  get _reports(): Report[][] {
    return Array.from(this.reports.values());
  }

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.thisWeekReport().subscribe(d => {
      this.year = d.year;
      this.week = d.week;

      for (const report of d.details) {
        const { project } = report;
        if (this.reports.has(project)) {
          this.reports.get(project).push(report);
        } else {
          this.reports.set(project, [report]);
        }
      }
    });
  }
}
