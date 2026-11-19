import { Component, input, output } from '@angular/core';
import { JournalEntryRecord } from '../journals-list-widget/journals-list-widget';

@Component({
  selector: 'app-delete-journal-entry-form',
  imports: [],
  templateUrl: './delete-journal-entry-form.html',
  styleUrl: './delete-journal-entry-form.css',
})
export class DeleteJournalEntryForm {
  entry = input.required<JournalEntryRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}