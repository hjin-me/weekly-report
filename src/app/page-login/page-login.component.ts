import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FillTeamDialogComponent } from '../fill-team-dialog/fill-team-dialog.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  inputName: string;
  inputPwd: string;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  login() {
    const o = this.sessionService.login(this.inputName, this.inputPwd);
    o.pipe(
      take(1),
      switchMap(data => {
        if (data.team) {
          return of('success');
        }
        const dialogRef = this.dialog.open(FillTeamDialogComponent, {
          width: '400px',
          data: {
            user: data.name
          }
        });
        return dialogRef.afterClosed().pipe(
          switchMap(team => {
            // fill this user team
            return this.sessionService.fillTeamInfo(team);
          })
        );
      })
    ).subscribe(result => {
      return this.router.navigateByUrl('/write');
    });
  }
}
