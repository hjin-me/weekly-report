import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface FillTeamDialogData {
  user: string;
  team: string;
}
@Component({
  selector: 'app-fill-team-dialog',
  templateUrl: './fill-team-dialog.component.html',
  styleUrls: ['./fill-team-dialog.component.css']
})
export class FillTeamDialogComponent implements OnInit {
  team = '';
  teamList: string[] = ['产品项目组', 'Web研发组', '数据架构组', '数据挖掘组'];
  constructor(
    private dialogRef: MatDialogRef<FillTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FillTeamDialogData
  ) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
