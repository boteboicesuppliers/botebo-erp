import { Component, effect, input, output, signal } from '@angular/core';
import {
  StaffMemberRecord,
  StaffStatus,
} from '../staff-members-list-widget/staff-members-list-widget';

@Component({
  selector: 'app-edit-staff-member-entry-form',
  imports: [],
  templateUrl: './edit-staff-member-entry-form.html',
  styleUrl: './edit-staff-member-entry-form.css',
})
export class EditStaffMemberEntryForm {
  member = input.required<StaffMemberRecord>();
  close = output<void>();
  save = output<StaffMemberRecord>();

  fullName = signal('');
  role = signal('');
  department = signal('');
  shift = signal('');
  contactPhone = signal('');
  status = signal<StaffStatus>('Active');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.member();
      this.fullName.set(current.fullName);
      this.role.set(current.role);
      this.department.set(current.department);
      this.shift.set(current.shift);
      this.contactPhone.set(current.contactPhone);
      this.status.set(current.status);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (
      !this.fullName().trim() ||
      !this.role().trim() ||
      !this.contactPhone().trim()
    ) {
      return;
    }

    const current = this.member();
    this.save.emit({
      ...current,
      fullName: this.fullName().trim(),
      role: this.role().trim(),
      department: this.department(),
      shift: this.shift(),
      contactPhone: this.contactPhone().trim(),
      status: this.status(),
    });
  }
}