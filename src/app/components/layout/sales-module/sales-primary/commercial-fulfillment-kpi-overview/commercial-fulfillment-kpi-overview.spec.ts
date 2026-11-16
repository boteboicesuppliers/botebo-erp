import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialFulfillmentKpiOverview } from './commercial-fulfillment-kpi-overview';

describe('CommercialFulfillmentKpiOverview', () => {
  let component: CommercialFulfillmentKpiOverview;
  let fixture: ComponentFixture<CommercialFulfillmentKpiOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialFulfillmentKpiOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialFulfillmentKpiOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
