import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionReportListWidget } from './production-report-list-widget';

describe('ProductionReportListWidget', () => {
  let component: ProductionReportListWidget;
  let fixture: ComponentFixture<ProductionReportListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionReportListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionReportListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
