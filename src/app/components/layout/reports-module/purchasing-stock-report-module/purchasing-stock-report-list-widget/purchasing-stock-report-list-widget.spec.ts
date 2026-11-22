import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingStockReportListWidget } from './purchasing-stock-report-list-widget';

describe('PurchasingStockReportListWidget', () => {
  let component: PurchasingStockReportListWidget;
  let fixture: ComponentFixture<PurchasingStockReportListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasingStockReportListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingStockReportListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
