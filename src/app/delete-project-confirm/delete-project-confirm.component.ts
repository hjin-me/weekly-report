import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectService } from '../project.service';
import { AddProjectDialogData } from '../add-project/add-project.component';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-delete-project-confirm',
  templateUrl: './delete-project-confirm.component.html',
  styleUrls: ['./delete-project-confirm.component.css']
})
export class DeleteProjectConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteProjectConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProjectDialogData,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  forgetIt() {
    this.dialogRef.close();
  }

  deleteIt() {
    this.projectService
      .deleteProject({
        id: this.data.id
      })
      .pipe(
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
      )
      .subscribe(() => {
        this.snackBar.open(`删除成功`, '', {
          duration: 3000
        });
        this.dialogRef.close();
      });
  }
}
