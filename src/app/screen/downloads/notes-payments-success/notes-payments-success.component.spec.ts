import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPaymentsSuccessComponent } from './notes-payments-success.component';

describe('NotesPaymentsSuccessComponent', () => {
  let component: NotesPaymentsSuccessComponent;
  let fixture: ComponentFixture<NotesPaymentsSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesPaymentsSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesPaymentsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
