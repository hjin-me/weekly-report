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

const appRoutes: Routes = [
  { path: '', component: PageWriteComponent },
  // { path: 'admin' }
];

@NgModule({
  declarations: [AppComponent, WorkTimeComponent, PageWriteComponent],
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
