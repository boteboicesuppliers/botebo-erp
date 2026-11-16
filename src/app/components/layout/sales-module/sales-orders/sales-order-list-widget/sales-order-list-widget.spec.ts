import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderListWidget } from './sales-order-list-widget';

describe('SalesOrderListWidget', () => {
  let component: SalesOrderListWidget;
  let fixture: ComponentFixture<SalesOrderListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
