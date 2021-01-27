import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPaymentsFaildsComponent } from './notes-payments-failds.component';

describe('NotesPaymentsFaildsComponent', () => {
  let component: NotesPaymentsFaildsComponent;
  let fixture: ComponentFixture<NotesPaymentsFaildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesPaymentsFaildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesPaymentsFaildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
