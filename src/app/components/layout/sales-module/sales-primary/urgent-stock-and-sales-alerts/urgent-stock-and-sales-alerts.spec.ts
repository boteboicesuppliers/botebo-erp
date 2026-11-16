import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentStockAndSalesAlerts } from './urgent-stock-and-sales-alerts';

describe('UrgentStockAndSalesAlerts', () => {
  let component: UrgentStockAndSalesAlerts;
  let fixture: ComponentFixture<UrgentStockAndSalesAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgentStockAndSalesAlerts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentStockAndSalesAlerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
