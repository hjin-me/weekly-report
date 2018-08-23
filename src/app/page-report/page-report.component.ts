import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project, Report, Week } from '../project';
import { ReportService } from '../report.service';
import { WeekService } from '../week.service';
import { ProjectService } from '../project.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

interface Filter<T> {
  value: T;
  disable: boolean;
}
@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.component.html',
  styleUrls: ['./page-report.component.css']
})
export class PageReportComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  selectedWeek: Week;
  weekOptions: Array<Week> = [];
  rawReports = new BehaviorSubject<Report[]>([]);
  reports: Observable<Report[][]>;
  projects: Project[] = [];
  projectFilter = new BehaviorSubject<string[]>([]);
  userFilter = new BehaviorSubject<string[]>([]);
  teamFilter = new BehaviorSubject<string[]>([]);
  existedProjectList: Observable<Filter<Project>[]>;
  teamList: Observable<Filter<string>[]>;
  userList: Observable<Filter<string>[]>;

  constructor(
    private reportService: ReportService,
    private weekService: WeekService,
    private projectService: ProjectService
  ) {
    this.weekOptions = this.weekService.latestWeeks(99);
  }

  ngOnInit() {
    this.selectedWeek = this.weekOptions[0];
    this.reports = combineLatest(
      this.rawReports,
      this.projectFilter,
      this.teamFilter,
      this.userFilter
    ).pipe(
      takeUntil(this.destroy$),
      map(([reports, project, team, user]) => {
        return reports.filter(r => {
          return (
            (project.length === 0 ||
              project.findIndex(p => r.project === p) > -1) &&
            (team.length === 0 || team.findIndex(t => r.team === t) > -1) &&
            (user.length === 0 || user.findIndex(u => r.reporter === u) > -1)
          );
        });
      }),
      map(reports => {
        const reportsMap = new Map<string, Report[]>();
        for (const report of reports) {
          const { project } = report;
          if (reportsMap.has(project)) {
            reportsMap.get(project).push(report);
          } else {
            reportsMap.set(project, [report]);
          }
        }
        const ret = Array.from(reportsMap.values());
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
      })
    );
    this.existedProjectList = this.rawReports.pipe(
      map(data =>
        this.projects.map(p => ({
          value: p,
          disable: data.findIndex(d => d.project === p.id) === -1
        }))
      )
    );
    this.teamList = this.rawReports.pipe(
      map(data =>
        Array.from(new Set(data.map(d => d.team)))
          .sort()
          .map(d => ({
            value: d,
            disable: false
          }))
      )
    );
    this.userList = this.rawReports.pipe(
      map(data =>
        Array.from(new Set(data.map(d => d.reporter)))
          .sort()
          .map(d => ({
            value: d,
            disable: false
          }))
      )
    );

    this.loadData(this.selectedWeek);
    this.projectService
      .getProjects()
      .pipe(
        takeUntil(this.destroy$),
        map(projects => {
          return projects.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        })
      )
      .subscribe(projects => (this.projects = projects));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
  filterValueChange(type, value: string[]) {
    switch (type) {
      case 'project':
        this.projectFilter.next(value);
        break;
      case 'team':
        this.teamFilter.next(value);
        break;
      case 'user':
        this.userFilter.next(value);
        break;
    }
  }

  loadData(w: Week) {
    this.reportService
      .weekReport(w.year, w.week)
      .pipe(
        takeUntil(this.destroy$),
        map(resp => resp.details)
      )
      .subscribe(data => {
        // do not complete this.rawReports
        this.rawReports.next(data);
      });
  }
}
