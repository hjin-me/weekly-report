import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Week, Weekly } from '../project';
import { ReportService } from '../report.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WeekService } from '../week.service';

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
    private weekService: WeekService
  ) {
    this.weekOptions = this.weekService.latestWeeks(99);
  }

  ngOnInit() {
    this.selectedWeek = this.weekOptions[0];

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
    this.report.week = this.selectedWeek;
    const report = JSON.parse(JSON.stringify(this.report));
    report.works = report.works.filter(w => !!w.project);
    this.reportService.save(report).subscribe(d => alert('success'));
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
