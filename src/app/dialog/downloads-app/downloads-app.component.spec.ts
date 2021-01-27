import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsAppComponent } from './downloads-app.component';

describe('DownloadsAppComponent', () => {
  let component: DownloadsAppComponent;
  let fixture: ComponentFixture<DownloadsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
