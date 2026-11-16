import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentOrdersWidget } from './urgent-orders-widget';

describe('UrgentOrdersWidget', () => {
  let component: UrgentOrdersWidget;
  let fixture: ComponentFixture<UrgentOrdersWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgentOrdersWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentOrdersWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
