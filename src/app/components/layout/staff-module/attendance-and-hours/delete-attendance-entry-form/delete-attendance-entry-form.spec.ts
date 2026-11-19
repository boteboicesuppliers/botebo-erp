import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttendanceEntryForm } from './delete-attendance-entry-form';

describe('DeleteAttendanceEntryForm', () => {
  let component: DeleteAttendanceEntryForm;
  let fixture: ComponentFixture<DeleteAttendanceEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAttendanceEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAttendanceEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
