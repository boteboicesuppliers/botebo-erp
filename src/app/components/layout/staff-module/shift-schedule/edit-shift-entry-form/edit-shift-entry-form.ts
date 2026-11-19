import { Component, effect, input, output, signal } from '@angular/core';
import {
  ShiftEntryRecord,
  ShiftStatus,
} from '../shifts-list-widget/shifts-list-widget';

@Component({
  selector: 'app-edit-shift-entry-form',
  imports: [],
  templateUrl: './edit-shift-entry-form.html',
  styleUrl: './edit-shift-entry-form.css',
})
export class EditShiftEntryForm {
  shift = input.required<ShiftEntryRecord>();
  close = output<void>();
  save = output<ShiftEntryRecord>();

  staffName = signal('');
  role = signal('');
  department = signal('');
  location = signal('');
  shiftDate = signal('');
  startTime = signal('');
  endTime = signal('');
  status = signal<ShiftStatus>('Scheduled');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.shift();
      this.staffName.set(current.staffName);
      this.role.set(current.role);
      this.department.set(current.department);
      this.location.set(current.location);
      this.shiftDate.set(current.shiftDate);
      this.startTime.set(current.startTime);
      this.endTime.set(current.endTime);
      this.status.set(current.status);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.staffName().trim() || !this.location().trim()) {
      return;
    }

    const current = this.shift();
    this.save.emit({
      ...current,
      staffName: this.staffName().trim(),
      role: this.role().trim() || current.role,
      department: this.department(),
      location: this.location().trim(),
      shiftDate: this.shiftDate(),
      startTime: this.startTime(),
      endTime: this.endTime(),
      status: this.status(),
    });
  }
}