import { Component, input, output } from '@angular/core';
import { AttendanceEntryRecord } from '../attendance-list-widget/attendance-list-widget';

@Component({
  selector: 'app-delete-attendance-entry-form',
  imports: [],
  templateUrl: './delete-attendance-entry-form.html',
  styleUrl: './delete-attendance-entry-form.css',
})
export class DeleteAttendanceEntryForm {
  entry = input.required<AttendanceEntryRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}