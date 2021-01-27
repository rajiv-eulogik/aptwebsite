import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCampComponent } from './test-camp.component';

describe('TestCampComponent', () => {
  let component: TestCampComponent;
  let fixture: ComponentFixture<TestCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
