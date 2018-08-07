import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWriteComponent } from './page-write.component';

describe('PageWriteComponent', () => {
  let component: PageWriteComponent;
  let fixture: ComponentFixture<PageWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
