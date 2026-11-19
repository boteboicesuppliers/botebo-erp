import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAttendanceEntryForm } from './new-attendance-entry-form';

describe('NewAttendanceEntryForm', () => {
  let component: NewAttendanceEntryForm;
  let fixture: ComponentFixture<NewAttendanceEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAttendanceEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAttendanceEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
