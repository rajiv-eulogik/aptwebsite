import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAsCollaboratorComponent } from './work-as-collaborator.component';

describe('WorkAsCollaboratorComponent', () => {
  let component: WorkAsCollaboratorComponent;
  let fixture: ComponentFixture<WorkAsCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAsCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAsCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
