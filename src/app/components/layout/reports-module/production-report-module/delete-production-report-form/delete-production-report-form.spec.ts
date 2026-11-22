import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductionReportForm } from './delete-production-report-form';

describe('DeleteProductionReportForm', () => {
  let component: DeleteProductionReportForm;
  let fixture: ComponentFixture<DeleteProductionReportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductionReportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductionReportForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
