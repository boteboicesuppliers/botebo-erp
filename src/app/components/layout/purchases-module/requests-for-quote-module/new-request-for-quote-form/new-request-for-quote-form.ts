import { Component, output, signal } from '@angular/core';
import { RfqRecord, RfqStatus } from '../quote-request-list-widget/quote-request-list-widget';

@Component({
  selector: 'app-new-request-for-quote-form',
  imports: [],
  templateUrl: './new-request-for-quote-form.html',
  styleUrl: './new-request-for-quote-form.css',
})
export class NewRequestForQuoteForm {
  close = output<void>();
  save = output<Omit<RfqRecord, 'id'>>();

  supplier = signal('');
  item = signal('');
  deadline = signal('2026-11-26');
  quotesReceived = signal('0 of 3');
  status = signal<RfqStatus>('Active');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.supplier().trim() || !this.item().trim()) {
      return;
    }

    this.save.emit({
      supplier: this.supplier().trim(),
      item: this.item().trim(),
      deadline: this.deadline(),
      quotesReceived: this.quotesReceived().trim() || '0 of 3',
      status: this.status(),
    });
  }
}