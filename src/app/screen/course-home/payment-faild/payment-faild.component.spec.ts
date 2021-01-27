import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFaildComponent } from './payment-faild.component';

describe('PaymentFaildComponent', () => {
  let component: PaymentFaildComponent;
  let fixture: ComponentFixture<PaymentFaildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFaildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFaildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
