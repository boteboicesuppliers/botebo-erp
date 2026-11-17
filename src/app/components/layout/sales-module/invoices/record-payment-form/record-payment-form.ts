import { Component, input, output, signal } from '@angular/core';
import { InvoiceRecord } from '../invoice-list-widget/invoice-list-widget';

@Component({
  selector: 'app-record-payment-form',
  imports: [],
  templateUrl: './record-payment-form.html',
  styleUrl: './record-payment-form.css',
})
export class RecordPaymentForm {
  invoice = input.required<InvoiceRecord>();
  close = output<void>();
  save = output<{ invoiceId: string; amountPaid: number }>();

  amountPaid = signal<number>(0);
  paymentMethod = signal('EFT Bank Transfer');
  referenceNo = signal('EFT-2026-9812');

  submitPayment() {
    const amt = Number(this.amountPaid());
    if (amt <= 0) return;

    this.save.emit({
      invoiceId: this.invoice().id,
      amountPaid: amt,
    });
  }

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}