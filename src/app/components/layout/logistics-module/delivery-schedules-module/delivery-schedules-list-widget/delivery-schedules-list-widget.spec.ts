import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySchedulesListWidget } from './delivery-schedules-list-widget';

describe('DeliverySchedulesListWidget', () => {
  let component: DeliverySchedulesListWidget;
  let fixture: ComponentFixture<DeliverySchedulesListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverySchedulesListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverySchedulesListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
