import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmGatewayComponent } from './paytm-gateway.component';

describe('PaytmGatewayComponent', () => {
  let component: PaytmGatewayComponent;
  let fixture: ComponentFixture<PaytmGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaytmGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
