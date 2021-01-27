import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnWithUsComponent } from './earn-with-us.component';

describe('EarnWithUsComponent', () => {
  let component: EarnWithUsComponent;
  let fixture: ComponentFixture<EarnWithUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnWithUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnWithUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
