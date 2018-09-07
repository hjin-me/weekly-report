import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddProjectComponent } from '../add-project/add-project.component';
import { SessionService } from '../session.service';
import { DeleteProjectConfirmComponent } from '../delete-project-confirm/delete-project-confirm.component';

@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.css']
})
export class PageProjectComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  projects: Project[] = [];
  admin$ = new BehaviorSubject<Boolean>(false);

  constructor(
    private sessionService: SessionService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  openAddDialog(data: Partial<Project> = {}) {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '400px',
      data: { ...data, tasks: [...(data.tasks || [])] }
    });
    return dialogRef
      .afterClosed()
      .pipe(
        switchMap(() => this.projectService.getProjects()),
        takeUntil(this.destroy$)
      )
      .subscribe(p => (this.projects = p));
  }
  deleteProject(data: Partial<Project> = {}) {
    const dialogRef = this.dialog.open(DeleteProjectConfirmComponent, {
      width: '400px',
      data: { ...data, tasks: [...(data.tasks || [])] }
    });
    return dialogRef
      .afterClosed()
      .pipe(
        switchMap(() => this.projectService.getProjects()),
        takeUntil(this.destroy$)
      )
      .subscribe(p => (this.projects = p));
  }

  ngOnInit() {
    this.sessionService.session$.subscribe(s => {
      if (!s) {
        this.admin$.next(false);
        return;
      }
      this.admin$.next(s.id === 'huangjin' || s.id === 'wangchao');
    });
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => (this.projects = p));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
