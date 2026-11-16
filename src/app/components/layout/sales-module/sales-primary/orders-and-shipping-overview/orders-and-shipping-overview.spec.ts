import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndShippingOverview } from './orders-and-shipping-overview';

describe('OrdersAndShippingOverview', () => {
  let component: OrdersAndShippingOverview;
  let fixture: ComponentFixture<OrdersAndShippingOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndShippingOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAndShippingOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
