import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FillTeamDialogComponent } from '../fill-team-dialog/fill-team-dialog.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          this.snackBar.open('An error occurred:', error.error.message, {
            duration: 3000
          });
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
            '',
            {
              duration: 3000
            }
          );
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
      })
    ).subscribe(result => {
      return this.router.navigateByUrl('/write');
    });
  }
}
