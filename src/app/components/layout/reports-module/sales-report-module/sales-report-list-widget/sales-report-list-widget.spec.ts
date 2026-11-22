import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportListWidget } from './sales-report-list-widget';

describe('SalesReportListWidget', () => {
  let component: SalesReportListWidget;
  let fixture: ComponentFixture<SalesReportListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesReportListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesReportListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
