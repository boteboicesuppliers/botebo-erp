import { Component, effect, input, output, signal } from '@angular/core';
import {
  ErpSourceModule,
  JournalEntryRecord,
  JournalType,
} from '../journals-list-widget/journals-list-widget';

@Component({
  selector: 'app-edit-journal-entry-form',
  imports: [],
  templateUrl: './edit-journal-entry-form.html',
  styleUrl: './edit-journal-entry-form.css',
})
export class EditJournalEntryForm {
  entry = input.required<JournalEntryRecord>();
  close = output<void>();
  save = output<JournalEntryRecord>();

  entryDate = signal('');
  journal = signal<JournalType>('GJ');
  sourceModule = signal<ErpSourceModule>('Manual Contingency');
  sourceRef = signal('');
  accountCode = signal('');
  accountName = signal('');
  debitAmount = signal<number>(0);
  creditAmount = signal<number>(0);
  description = signal('');

  constructor() {
    effect(() => {
      const current = this.entry();
      this.entryDate.set(current.entryDate);
      this.journal.set(current.journal);
      this.sourceModule.set(current.sourceModule);
      this.sourceRef.set(current.sourceRef);
      this.accountCode.set(current.accountCode);
      this.accountName.set(current.accountName);
      this.debitAmount.set(current.debitAmount);
      this.creditAmount.set(current.creditAmount);
      this.description.set(current.description);
    });
  }

  submitEdit() {
    const current = this.entry();
    this.save.emit({
      ...current,
      entryDate: this.entryDate(),
      journal: this.journal(),
      sourceModule: this.sourceModule(),
      sourceRef: this.sourceRef().trim() || current.sourceRef,
      accountCode: this.accountCode().trim() || current.accountCode,
      accountName: this.accountName().trim() || current.accountName,
      debitAmount: Number(this.debitAmount()) || 0,
      creditAmount: Number(this.creditAmount()) || 0,
      description: this.description().trim() || current.description,
    });
  }
}