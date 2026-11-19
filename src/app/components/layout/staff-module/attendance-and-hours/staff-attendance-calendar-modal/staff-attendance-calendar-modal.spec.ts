import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceCalendarModal } from './staff-attendance-calendar-modal';

describe('StaffAttendanceCalendarModal', () => {
  let component: StaffAttendanceCalendarModal;
  let fixture: ComponentFixture<StaffAttendanceCalendarModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAttendanceCalendarModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAttendanceCalendarModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
