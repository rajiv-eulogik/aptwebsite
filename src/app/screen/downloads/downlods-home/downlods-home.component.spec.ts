import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlodsHomeComponent } from './downlods-home.component';

describe('DownlodsHomeComponent', () => {
  let component: DownlodsHomeComponent;
  let fixture: ComponentFixture<DownlodsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownlodsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownlodsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
