import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrders } from './sales-orders';

describe('SalesOrders', () => {
  let component: SalesOrders;
  let fixture: ComponentFixture<SalesOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
