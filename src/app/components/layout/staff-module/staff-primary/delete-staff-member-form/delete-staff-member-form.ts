import { Component, input, output } from '@angular/core';
import { StaffMemberRecord } from '../staff-members-list-widget/staff-members-list-widget';

@Component({
  selector: 'app-delete-staff-member-form',
  imports: [],
  templateUrl: './delete-staff-member-form.html',
  styleUrl: './delete-staff-member-form.css',
})
export class DeleteStaffMemberForm {
  member = input.required<StaffMemberRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}