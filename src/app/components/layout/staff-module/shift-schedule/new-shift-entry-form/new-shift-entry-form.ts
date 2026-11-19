import { Component, output, signal } from '@angular/core';
import {
  ShiftEntryRecord,
  ShiftStatus,
} from '../shifts-list-widget/shifts-list-widget';

@Component({
  selector: 'app-new-shift-entry-form',
  imports: [],
  templateUrl: './new-shift-entry-form.html',
  styleUrl: './new-shift-entry-form.css',
})
export class NewShiftEntryForm {
  close = output<void>();
  save = output<Omit<ShiftEntryRecord, 'id'>>();

  staffName = signal('');
  role = signal('Refrigeration Technician');
  department = signal('Production Line A');
  location = signal('3 Gaus Court, CW2, Vanderbijlpark');
  shiftDate = signal('2026-11-19');
  startTime = signal('06:00');
  endTime = signal('14:00');
  status = signal<ShiftStatus>('Scheduled');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.staffName().trim() || !this.location().trim()) {
      return;
    }

    this.save.emit({
      staffName: this.staffName().trim(),
      role: this.role().trim() || 'Operations Staff',
      department: this.department(),
      location: this.location().trim(),
      shiftDate: this.shiftDate(),
      startTime: this.startTime(),
      endTime: this.endTime(),
      status: this.status(),
    });
  }
}