import { Component, output, signal } from '@angular/core';
import {
  StaffMemberRecord,
  StaffStatus,
} from '../staff-members-list-widget/staff-members-list-widget';

@Component({
  selector: 'app-new-staff-member-form',
  imports: [],
  templateUrl: './new-staff-member-form.html',
  styleUrl: './new-staff-member-form.css',
})
export class NewStaffMemberForm {
  close = output<void>();
  save = output<Omit<StaffMemberRecord, 'id'>>();

  fullName = signal('');
  role = signal('');
  department = signal('Production Line A');
  shift = signal('Day Shift (06:00 - 14:00)');
  contactPhone = signal('');
  status = signal<StaffStatus>('Active');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (
      !this.fullName().trim() ||
      !this.role().trim() ||
      !this.contactPhone().trim()
    ) {
      return;
    }

    this.save.emit({
      fullName: this.fullName().trim(),
      role: this.role().trim(),
      department: this.department(),
      shift: this.shift(),
      contactPhone: this.contactPhone().trim(),
      status: this.status(),
    });
  }
}