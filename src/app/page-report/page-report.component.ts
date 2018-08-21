import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project, Report, Week } from '../project';
import { ReportService } from '../report.service';
import { WeekService } from '../week.service';
import { ProjectService } from '../project.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.component.html',
  styleUrls: ['./page-report.component.css']
})
export class PageReportComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  selectedWeek: Week;
  weekOptions: Array<Week> = [];
  reports = new Map<string, Report[]>();
  projects: Project[] = [];

  get _reports(): Report[][] {
    const ret = Array.from(this.reports.values());
    ret.sort((a, b) => {
      if (a.length > 0 && b.length > 0) {
        if (a[0].project > b[0].project) {
          return 1;
        }
        if (a[0].project < b[0].project) {
          return -1;
        }
        return 0;
      }
      if (a.length === 0) {
        return 1;
      }
      if (b.length === 0) {
        return -1;
      }
      return 0;
    });
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
    private weekService: WeekService,
    private projectService: ProjectService
  ) {
    this.weekOptions = this.weekService.latestWeeks(99);
  }

  ngOnInit() {
    this.selectedWeek = this.weekOptions[0];
    this.loadData(this.selectedWeek);
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => (this.projects = projects));
  }

  ngOnDestroy() {
    this.destroy$.next();
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
