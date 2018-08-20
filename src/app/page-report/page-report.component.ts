import { Component, OnInit } from '@angular/core';
import { Report, Week } from '../project';
import { ReportService } from '../report.service';
import { WeekService } from '../week.service';

@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.component.html',
  styleUrls: ['./page-report.component.css']
})
export class PageReportComponent implements OnInit {
  selectedWeek: Week;
  weekOptions: Array<Week> = [];
  reports = new Map<string, Report[]>();

  get _reports(): Report[][] {
    const ret = Array.from(this.reports.values());
    for (const p of ret) {
      p.sort((a, b) => {
        if (a.task > b.task) {
          return 1;
        }
        if (a.task < b.task) {
          return -1;
        }
        return 0;
      });
    }
    return ret;
  }

  constructor(
    private reportService: ReportService,
    private weekService: WeekService
  ) {
    this.weekOptions = this.weekService.latestWeeks(99);
  }

  ngOnInit() {
    this.selectedWeek = this.weekOptions[0];
    this.loadData(this.selectedWeek);
  }

  loadData(w: Week) {
    this.reportService.weekReport(w.year, w.week).subscribe(d => {
      this.reports = new Map<string, Report[]>();
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
