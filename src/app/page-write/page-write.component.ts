import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Week, Weekly } from '../project';
import { ReportService } from '../report.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { WeekService } from '../week.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-page-write',
  templateUrl: './page-write.component.html',
  styleUrls: ['./page-write.component.css']
})
export class PageWriteComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  report: Weekly;
  projects: Project[] = [];
  selectedWeek: Week;
  weekOptions: Array<Week> = [];

  constructor(
    private projectService: ProjectService,
    private reportService: ReportService,
    private weekService: WeekService,
    private snackBar: MatSnackBar
  ) {
    this.weekOptions = this.weekService.latestWeeks(99);
  }

  ngOnInit() {
    if (new Date().getDay() < 3) {
      this.selectedWeek = this.weekOptions[1];
    } else {
      this.selectedWeek = this.weekOptions[0];
    }

    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => (this.projects = p));
    if (!this.report) {
      this.report = this.reportService.create();
    }
    this.reportService
      .queryWeekly(this.selectedWeek.year, this.selectedWeek.week)
      .subscribe(report => {
        if (report) {
          this.report = report;
          this.checkLastWork();
        }
      });
    this.checkLastWork();
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  removeRow(id: string) {
    if (!id) {
      return;
    }

    const index = this.report.works.findIndex(w => w.project === id);
    this.report.works.splice(index, 1);
  }

  checkLastWork(index?: number) {
    if (typeof index === 'number') {
      const project = this.projects.find(
        p => p.id === this.report.works[index].project
      );
      if (
        project &&
        project.tasks.findIndex(t => t === this.report.works[index].task) === -1
      ) {
        this.report.works[index].task = project.tasks[0];
      }
    }

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
    this.report.week = this.selectedWeek;
    const report = JSON.parse(JSON.stringify(this.report));
    report.works = report.works.filter(w => !!w.project);
    this.reportService
      .save(report)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            this.snackBar.open(
              'An error occurred: ' + error.error.message,
              '我知道了',
              {
                duration: 3000
              }
            );
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` + `body was:`,
              error.error
            );
            this.snackBar.open(
              `Backend returned code ${error.status}, ` +
                `body was: ${error.error.errors[0].message}`,
              '我知道了',
              {
                duration: 3000
              }
            );
          }
          // return an observable with a user-facing error message
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(() => {
        this.snackBar.open(`保存成功`, '确认', {
          duration: 3000
        });
      });
  }

  loadData(w: Week) {
    this.reportService.queryWeekly(w.year, w.week).subscribe(report => {
      if (report) {
        this.report = report;
        this.checkLastWork();
      } else {
        this.report = this.reportService.create();
        this.checkLastWork();
      }
    });
  }
}
