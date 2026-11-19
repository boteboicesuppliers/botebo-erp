import { Component, output, signal } from '@angular/core';
import {
  AttendanceEntryRecord,
  AttendanceStatus,
} from '../attendance-list-widget/attendance-list-widget';

@Component({
  selector: 'app-new-attendance-entry-form',
  imports: [],
  templateUrl: './new-attendance-entry-form.html',
  styleUrl: './new-attendance-entry-form.css',
})
export class NewAttendanceEntryForm {
  close = output<void>();
  save = output<Omit<AttendanceEntryRecord, 'id'>>();

  staffName = signal('');
  staffId = signal('STF-2026-001');
  shiftRef = signal('SHF-2026-101');
  department = signal('Production Line A');
  location = signal('3 Gaus Court, CW2, Vanderbijlpark');
  attendanceDate = signal('2026-11-19');
  scheduledWindow = signal('06:00 - 14:00');
  clockIn = signal('06:00');
  clockOut = signal('14:00');
  regularHours = signal<number>(8);
  overtimeHours = signal<number>(0);
  status = signal<AttendanceStatus>('Present');
  notes = signal('');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.staffName().trim() || !this.location().trim()) {
      return;
    }

    this.save.emit({
      staffName: this.staffName().trim(),
      staffId: this.staffId().trim() || 'STF-2026-000',
      shiftRef: this.shiftRef().trim() || 'SHF-2026-000',
      department: this.department(),
      location: this.location().trim(),
      attendanceDate: this.attendanceDate(),
      scheduledWindow: this.scheduledWindow().trim() || '06:00 - 14:00',
      clockIn: this.clockIn().trim() || '--:--',
      clockOut: this.clockOut().trim() || '--:--',
      regularHours: Number(this.regularHours()) || 0,
      overtimeHours: Number(this.overtimeHours()) || 0,
      status: this.status(),
      notes: this.notes().trim(),
    });
  }
}