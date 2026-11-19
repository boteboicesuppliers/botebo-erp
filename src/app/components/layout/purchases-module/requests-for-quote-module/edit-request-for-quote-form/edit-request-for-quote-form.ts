import { Component, effect, input, output, signal } from '@angular/core';
import { RfqRecord, RfqStatus } from '../quote-request-list-widget/quote-request-list-widget';

@Component({
  selector: 'app-edit-request-for-quote-form',
  imports: [],
  templateUrl: './edit-request-for-quote-form.html',
  styleUrl: './edit-request-for-quote-form.css',
})
export class EditRequestForQuoteForm {
  rfq = input.required<RfqRecord>();
  close = output<void>();
  save = output<RfqRecord>();

  supplier = signal('');
  item = signal('');
  deadline = signal('');
  quotesReceived = signal('');
  status = signal<RfqStatus>('Active');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.rfq();
      this.supplier.set(current.supplier);
      this.item.set(current.item);
      this.deadline.set(current.deadline);
      this.quotesReceived.set(current.quotesReceived);
      this.status.set(current.status);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.supplier().trim() || !this.item().trim()) {
      return;
    }

    const current = this.rfq();
    this.save.emit({
      ...current,
      supplier: this.supplier().trim(),
      item: this.item().trim(),
      deadline: this.deadline(),
      quotesReceived: this.quotesReceived().trim() || current.quotesReceived,
      status: this.status(),
    });
  }
}