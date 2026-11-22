import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingStockReport } from './purchasing-stock-report';

describe('PurchasingStockReport', () => {
  let component: PurchasingStockReport;
  let fixture: ComponentFixture<PurchasingStockReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasingStockReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingStockReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
