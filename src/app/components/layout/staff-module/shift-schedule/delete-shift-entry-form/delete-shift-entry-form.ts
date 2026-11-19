import { Component, input, output } from '@angular/core';
import { ShiftEntryRecord } from '../shifts-list-widget/shifts-list-widget';

@Component({
  selector: 'app-delete-shift-entry-form',
  imports: [],
  templateUrl: './delete-shift-entry-form.html',
  styleUrl: './delete-shift-entry-form.css',
})
export class DeleteShiftEntryForm {
  shift = input.required<ShiftEntryRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}