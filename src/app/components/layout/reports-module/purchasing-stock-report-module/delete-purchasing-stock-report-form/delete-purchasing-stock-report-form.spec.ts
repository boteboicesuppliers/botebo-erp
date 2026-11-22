import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchasingStockReportForm } from './delete-purchasing-stock-report-form';

describe('DeletePurchasingStockReportForm', () => {
  let component: DeletePurchasingStockReportForm;
  let fixture: ComponentFixture<DeletePurchasingStockReportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePurchasingStockReportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePurchasingStockReportForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
