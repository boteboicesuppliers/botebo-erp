import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryScheduleForm } from './edit-delivery-schedule-form';

describe('EditDeliveryScheduleForm', () => {
  let component: EditDeliveryScheduleForm;
  let fixture: ComponentFixture<EditDeliveryScheduleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeliveryScheduleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeliveryScheduleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
