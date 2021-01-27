import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTieUpsComponent } from './school-tie-ups.component';

describe('SchoolTieUpsComponent', () => {
  let component: SchoolTieUpsComponent;
  let fixture: ComponentFixture<SchoolTieUpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTieUpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTieUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
