import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatChipInputEvent,
  MatDialogRef
} from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProjectService } from '../project.service';

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
    private projectService: ProjectService
  ) {}

  ngOnInit() {}

  save(next?: boolean) {
    console.log(this.data);
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
