import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySchedules } from './delivery-schedules';

describe('DeliverySchedules', () => {
  let component: DeliverySchedules;
  let fixture: ComponentFixture<DeliverySchedules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverySchedules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverySchedules);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
