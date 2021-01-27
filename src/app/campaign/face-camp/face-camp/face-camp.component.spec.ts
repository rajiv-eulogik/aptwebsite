import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceCampComponent } from './face-camp.component';

describe('FaceCampComponent', () => {
  let component: FaceCampComponent;
  let fixture: ComponentFixture<FaceCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
