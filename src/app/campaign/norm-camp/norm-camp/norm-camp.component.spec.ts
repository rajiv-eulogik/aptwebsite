import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormCampComponent } from './norm-camp.component';

describe('NormCampComponent', () => {
  let component: NormCampComponent;
  let fixture: ComponentFixture<NormCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
