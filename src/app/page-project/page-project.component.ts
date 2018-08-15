import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.css']
})
export class PageProjectComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  openAddDialog() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '400px',
      data: {}
    });
    return dialogRef.afterClosed();
  }

  ngOnInit() {
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => (this.projects = p));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
