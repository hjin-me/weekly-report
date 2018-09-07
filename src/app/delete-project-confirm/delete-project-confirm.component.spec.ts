import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectConfirmComponent } from './delete-project-confirm.component';

describe('DeleteProjectConfirmComponent', () => {
  let component: DeleteProjectConfirmComponent;
  let fixture: ComponentFixture<DeleteProjectConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProjectConfirmComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
