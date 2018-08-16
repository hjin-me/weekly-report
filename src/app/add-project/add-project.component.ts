import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatChipInputEvent,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProjectService } from '../project.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface AddProjectDialogData {
  id: string;
  name: string;
  tasks: string[];
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProjectDialogData,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  save(next?: boolean) {
    this.projectService
      .saveProject({
        ...this.data
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
        if (next) {
          this.data.id = '';
          this.data.name = '';
          this.snackBar.open('添加成功，请继续', '', {
            duration: 3000
          });
        } else {
          this.dialogRef.close();
        }
      });
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (!this.data.tasks) {
      this.data.tasks = [];
    }

    // Add our fruit
    if ((value || '').trim()) {
      this.data.tasks.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(task: string): void {
    const index = this.data.tasks.indexOf(task);

    if (index >= 0) {
      this.data.tasks.splice(index, 1);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
