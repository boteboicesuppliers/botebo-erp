import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalesReportForm } from './delete-sales-report-form';

describe('DeleteSalesReportForm', () => {
  let component: DeleteSalesReportForm;
  let fixture: ComponentFixture<DeleteSalesReportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSalesReportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSalesReportForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
