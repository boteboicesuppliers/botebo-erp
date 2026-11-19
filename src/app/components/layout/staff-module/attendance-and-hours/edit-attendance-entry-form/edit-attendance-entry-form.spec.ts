import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendanceEntryForm } from './edit-attendance-entry-form';

describe('EditAttendanceEntryForm', () => {
  let component: EditAttendanceEntryForm;
  let fixture: ComponentFixture<EditAttendanceEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAttendanceEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttendanceEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
