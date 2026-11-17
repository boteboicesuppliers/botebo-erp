import { Component, output, signal } from '@angular/core';
import { InvoiceRecord, InvoiceStatus } from '../invoice-list-widget/invoice-list-widget';

@Component({
  selector: 'app-new-invoice-form',
  imports: [],
  templateUrl: './new-invoice-form.html',
  styleUrl: './new-invoice-form.css',
})
export class NewInvoiceForm {
  close = output<void>();
  save = output<Omit<InvoiceRecord, 'id'>>();

  orderId = signal('SO-2026-0920');
  customerCode = signal('C-RES-0045');
  client = signal('');
  issueDate = signal('2026-11-17');
  dueDate = signal('2026-12-17');
  totalAmount = signal<number | null>(null);
  status = signal<InvoiceStatus>('Unpaid');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.client().trim() || !this.totalAmount() || this.totalAmount()! <= 0) {
      return;
    }

    const amt = Number(this.totalAmount());
    this.save.emit({
      orderId: this.orderId().trim() || 'SO-2026-0000',
      customerCode: this.customerCode().trim() || 'C-RES-0000',
      client: this.client().trim(),
      issueDate: this.issueDate(),
      dueDate: this.dueDate(),
      totalAmount: amt,
      balanceDue: amt,
      status: this.status(),
    });
  }
}