import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFacultyComponent } from './video-faculty.component';

describe('VideoFacultyComponent', () => {
  let component: VideoFacultyComponent;
  let fixture: ComponentFixture<VideoFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
