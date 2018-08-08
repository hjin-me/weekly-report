import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WorkTimeComponent } from './work-time/work-time.component';
import { RouterModule, Routes } from '@angular/router';
import { PageWriteComponent } from './page-write/page-write.component';
import { PageProjectComponent } from './page-project/page-project.component';
import { NavComponent } from './nav/nav.component';
import { TaskPipe } from './task.pipe';
import { ProjectExistPipe } from './project-exist.pipe';

const appRoutes: Routes = [
  { path: '', component: PageWriteComponent },
  { path: 'projects', component: PageProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WorkTimeComponent,
    PageWriteComponent,
    PageProjectComponent,
    NavComponent,
    TaskPipe,
    ProjectExistPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
