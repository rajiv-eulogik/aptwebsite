import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopperSpeaksComponent } from './topper-speaks.component';

describe('TopperSpeaksComponent', () => {
  let component: TopperSpeaksComponent;
  let fixture: ComponentFixture<TopperSpeaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopperSpeaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopperSpeaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
