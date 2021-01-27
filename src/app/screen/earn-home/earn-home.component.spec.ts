import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnHomeComponent } from './earn-home.component';

describe('EarnHomeComponent', () => {
  let component: EarnHomeComponent;
  let fixture: ComponentFixture<EarnHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
