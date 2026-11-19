import { Component, input, output } from '@angular/core';
import { GrnEntryRecord } from '../grn-list-widget/grn-list-widget';

@Component({
  selector: 'app-delete-grn-entry-form',
  imports: [],
  templateUrl: './delete-grn-entry-form.html',
  styleUrl: './delete-grn-entry-form.css',
})
export class DeleteGrnEntryForm {
  grn = input.required<GrnEntryRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}