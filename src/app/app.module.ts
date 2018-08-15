import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WorkTimeComponent } from './work-time/work-time.component';
import { RouterModule, Routes } from '@angular/router';
import { PageWriteComponent } from './page-write/page-write.component';
import { PageProjectComponent } from './page-project/page-project.component';
import { NavComponent } from './nav/nav.component';
import { TaskPipe } from './pipes/task/task.pipe';
import { ProjectExistPipe } from './project-exist.pipe';
import { PageLoginComponent } from './page-login/page-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SessionInterceptor } from './session.interceptor';
import { PageReportComponent } from './page-report/page-report.component';
import { FillTeamDialogComponent } from './fill-team-dialog/fill-team-dialog.component';
import { PermissionGuard } from './permission.guard';
import { AddProjectComponent } from './add-project/add-project.component';

const appRoutes: Routes = [
  {
    path: 'write',
    component: PageWriteComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: 'projects',
    component: PageProjectComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: 'report',
    component: PageReportComponent,
    canActivate: [PermissionGuard]
  },
  { path: 'session/login', component: PageLoginComponent },
  { path: '**', redirectTo: 'write' }
];

@NgModule({
  declarations: [
    AppComponent,
    WorkTimeComponent,
    PageWriteComponent,
    PageProjectComponent,
    NavComponent,
    TaskPipe,
    ProjectExistPipe,
    PageLoginComponent,
    PageReportComponent,
    FillTeamDialogComponent,
    AddProjectComponent
  ],
  entryComponents: [FillTeamDialogComponent, AddProjectComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatChipsModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
