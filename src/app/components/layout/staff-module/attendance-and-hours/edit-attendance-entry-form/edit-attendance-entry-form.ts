import { Component, effect, input, output, signal } from '@angular/core';
import {
  AttendanceEntryRecord,
  AttendanceStatus,
} from '../attendance-list-widget/attendance-list-widget';

@Component({
  selector: 'app-edit-attendance-entry-form',
  imports: [],
  templateUrl: './edit-attendance-entry-form.html',
  styleUrl: './edit-attendance-entry-form.css',
})
export class EditAttendanceEntryForm {
  entry = input.required<AttendanceEntryRecord>();
  close = output<void>();
  save = output<AttendanceEntryRecord>();

  staffName = signal('');
  staffId = signal('');
  shiftRef = signal('');
  department = signal('');
  location = signal('');
  attendanceDate = signal('');
  scheduledWindow = signal('');
  clockIn = signal('');
  clockOut = signal('');
  regularHours = signal<number>(0);
  overtimeHours = signal<number>(0);
  status = signal<AttendanceStatus>('Present');
  notes = signal('');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.entry();
      this.staffName.set(current.staffName);
      this.staffId.set(current.staffId);
      this.shiftRef.set(current.shiftRef);
      this.department.set(current.department);
      this.location.set(current.location);
      this.attendanceDate.set(current.attendanceDate);
      this.scheduledWindow.set(current.scheduledWindow);
      this.clockIn.set(current.clockIn);
      this.clockOut.set(current.clockOut);
      this.regularHours.set(current.regularHours);
      this.overtimeHours.set(current.overtimeHours);
      this.status.set(current.status);
      this.notes.set(current.notes);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.staffName().trim() || !this.location().trim()) {
      return;
    }

    const current = this.entry();
    this.save.emit({
      ...current,
      staffName: this.staffName().trim(),
      staffId: this.staffId().trim() || current.staffId,
      shiftRef: this.shiftRef().trim() || current.shiftRef,
      department: this.department(),
      location: this.location().trim(),
      attendanceDate: this.attendanceDate(),
      scheduledWindow: this.scheduledWindow().trim() || current.scheduledWindow,
      clockIn: this.clockIn().trim() || '--:--',
      clockOut: this.clockOut().trim() || '--:--',
      regularHours: Number(this.regularHours()) || 0,
      overtimeHours: Number(this.overtimeHours()) || 0,
      status: this.status(),
      notes: this.notes().trim(),
    });
  }
}