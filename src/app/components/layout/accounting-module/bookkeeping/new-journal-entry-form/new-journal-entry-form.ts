import { Component, output, signal } from '@angular/core';
import {
  AccountNormalSide,
  ErpSourceModule,
  JournalEntryRecord,
  JournalType,
} from '../journals-list-widget/journals-list-widget';

@Component({
  selector: 'app-new-journal-entry-form',
  imports: [],
  templateUrl: './new-journal-entry-form.html',
  styleUrl: './new-journal-entry-form.css',
})
export class NewJournalEntryForm {
  close = output<void>();
  save = output<Omit<JournalEntryRecord, 'id'>>();

  entryDate = signal('2026-11-19');
  journal = signal<JournalType>('GJ');
  sourceModule = signal<ErpSourceModule>('Manual Contingency');
  sourceRef = signal('CONT-2026-001');
  accountCode = signal('1010');
  accountName = signal('Bank Operating Account');
  normalSide = signal<AccountNormalSide>('Debit');
  debitAmount = signal<number>(0);
  creditAmount = signal<number>(0);
  location = signal('3 Gaus Court, CW2, Vanderbijlpark');
  description = signal('');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    const dr = Number(this.debitAmount()) || 0;
    const cr = Number(this.creditAmount()) || 0;
    if (!this.accountName().trim() || (dr <= 0 && cr <= 0)) {
      return;
    }

    this.save.emit({
      entryDate: this.entryDate(),
      journal: this.journal(),
      sourceModule: this.sourceModule(),
      sourceRef: this.sourceRef().trim() || 'MANUAL-REF',
      accountCode: this.accountCode().trim() || '9999',
      accountName: this.accountName().trim(),
      normalSide: this.normalSide(),
      debitAmount: dr,
      creditAmount: cr,
      location: this.location().trim() || '3 Gaus Court, CW2, Vanderbijlpark',
      description: this.description().trim() || 'Manual / contingency journal posting',
    });
  }
}