import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeliveryScheduleForm } from './delete-delivery-schedule-form';

describe('DeleteDeliveryScheduleForm', () => {
  let component: DeleteDeliveryScheduleForm;
  let fixture: ComponentFixture<DeleteDeliveryScheduleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDeliveryScheduleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDeliveryScheduleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
