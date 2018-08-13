import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillTeamDialogComponent } from './fill-team-dialog.component';

describe('FillTeamDialogComponent', () => {
  let component: FillTeamDialogComponent;
  let fixture: ComponentFixture<FillTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
