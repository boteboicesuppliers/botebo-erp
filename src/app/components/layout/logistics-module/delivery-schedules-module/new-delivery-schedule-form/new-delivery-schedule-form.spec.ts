import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeliveryScheduleForm } from './new-delivery-schedule-form';

describe('NewDeliveryScheduleForm', () => {
  let component: NewDeliveryScheduleForm;
  let fixture: ComponentFixture<NewDeliveryScheduleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDeliveryScheduleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDeliveryScheduleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
