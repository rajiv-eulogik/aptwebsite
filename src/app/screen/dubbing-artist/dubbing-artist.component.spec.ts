import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubbingArtistComponent } from './dubbing-artist.component';

describe('DubbingArtistComponent', () => {
  let component: DubbingArtistComponent;
  let fixture: ComponentFixture<DubbingArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubbingArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubbingArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
