import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderKpiOverview } from './sales-order-kpi-overview';

describe('SalesOrderKpiOverview', () => {
  let component: SalesOrderKpiOverview;
  let fixture: ComponentFixture<SalesOrderKpiOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderKpiOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderKpiOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
