import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceKpiOverview } from './invoice-kpi-overview';

describe('InvoiceKpiOverview', () => {
  let component: InvoiceKpiOverview;
  let fixture: ComponentFixture<InvoiceKpiOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceKpiOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceKpiOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
