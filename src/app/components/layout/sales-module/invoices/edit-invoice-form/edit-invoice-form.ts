import { Component, effect, input, output, signal } from '@angular/core';
import { InvoiceRecord, InvoiceStatus } from '../invoice-list-widget/invoice-list-widget';

@Component({
  selector: 'app-edit-invoice-form',
  imports: [],
  templateUrl: './edit-invoice-form.html',
  styleUrl: './edit-invoice-form.css',
})
export class EditInvoiceForm {
  invoice = input.required<InvoiceRecord>();
  close = output<void>();
  save = output<InvoiceRecord>();

  client = signal('');
  dueDate = signal('');
  totalAmount = signal(0);
  balanceDue = signal(0);
  status = signal<InvoiceStatus>('Unpaid');

  constructor() {
    effect(() => {
      const inv = this.invoice();
      this.client.set(inv.client);
      this.dueDate.set(inv.dueDate);
      this.totalAmount.set(inv.totalAmount);
      this.balanceDue.set(inv.balanceDue);
      this.status.set(inv.status);
    });
  }

  submitEdit() {
    const current = this.invoice();
    this.save.emit({
      ...current,
      client: this.client().trim() || current.client,
      dueDate: this.dueDate(),
      totalAmount: Number(this.totalAmount()),
      balanceDue: Number(this.balanceDue()),
      status: this.status(),
    });
  }
}