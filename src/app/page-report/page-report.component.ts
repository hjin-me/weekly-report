import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project, Report, Week } from '../project';
import { ReportService } from '../report.service';
import { WeekService } from '../week.service';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

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
  rawReports$ = new BehaviorSubject<Report[]>([]);
  reports$: Observable<Report[][]>;
  projects$ = new BehaviorSubject<Project[]>([]);
  projectFilter$ = new BehaviorSubject<string[]>([]);
  userFilter$ = new BehaviorSubject<string[]>([]);
  teamFilter$ = new BehaviorSubject<string[]>([]);
  existedProjectList$: Observable<Filter<Project>[]>;
  teamList$: Observable<Filter<string>[]>;
  userList$: Observable<Filter<string>[]>;

  constructor(
    private reportService: ReportService,
    private weekService: WeekService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.weekOptions = this.weekService.latestWeeks(99);
  }

  ngOnInit() {
    if (new Date().getDay() < 3) {
      this.selectedWeek = this.weekOptions[1];
    } else {
      this.selectedWeek = this.weekOptions[0];
    }
    this.reports$ = combineLatest(
      this.rawReports$,
      this.projectFilter$,
      this.teamFilter$,
      this.userFilter$
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
    this.existedProjectList$ = this.rawReports$.pipe(
      withLatestFrom(this.projects$),
      map(([data, projects]) =>
        projects.map(p => ({
          value: p,
          disable: data.findIndex(d => d.project === p.id) === -1
        }))
      )
    );
    this.teamList$ = this.rawReports$.pipe(
      map(data =>
        Array.from(new Set(data.map(d => d.team)))
          .sort()
          .map(d => ({
            value: d,
            disable: false
          }))
      )
    );
    this.userList$ = this.rawReports$.pipe(
      map(data =>
        Array.from(new Set(data.map(d => d.reporter)))
          .sort()
          .map(d => ({
            value: d,
            disable: false
          }))
      )
    );

    this.http
      .post<{
        data: {
          projects: Project[];
          report: { year: number; week: number; details: Report[] };
        };
      }>('/x/graph', {
        query: `query ProjectsAndReports($year: Int!, $week: Int!) {
	      projects {
	        id, name, tasks
	      }
	      report(year: $year, week: $week) {
	        year, week,
	        details {
	          year, week, project, task, reporter, requester, time, info, team, problem
	        }
	      }
      }`,
        variables: {
          ...this.selectedWeek
        }
      })
      .pipe(
        takeUntil(this.destroy$),
        map(resp => {
          const projects = resp.data.projects;
          projects.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
          return {
            reports: resp.data.report.details,
            projects
          };
        })
      )
      .subscribe(({ reports, projects }) => {
        this.projects$.next(projects);
        this.rawReports$.next(reports);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  filterValueChange(type, value: string[]) {
    switch (type) {
      case 'project':
        this.projectFilter$.next(value);
        break;
      case 'team':
        this.teamFilter$.next(value);
        break;
      case 'user':
        this.userFilter$.next(value);
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
        // do not complete this.rawReports$
        this.rawReports$.next(data);
      });
  }

  copy() {
    const func = (e: ClipboardEvent) => {
      e.preventDefault();
      const el = document.querySelector('.to-be-copy');
      if (!el) {
        this.snackBar.open('复制失败，页面上好像没找到', '唉');
        return;
      }
      e.clipboardData.setData('text/html', el.innerHTML);

      this.snackBar.open('已成功复制，你可以在 wiki 页面上直接粘贴', '好的');
    };
    document.addEventListener('copy', func);
    document.execCommand('copy');
    document.removeEventListener('copy', func);
  }
}
