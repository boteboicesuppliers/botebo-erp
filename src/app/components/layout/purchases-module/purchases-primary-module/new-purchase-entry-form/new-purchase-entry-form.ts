import { Component, output, signal } from '@angular/core';
import {
  PurchaseEntryRecord,
  PurchaseOrderStatus,
} from '../purchases-list-widget/purchases-list-widget';

@Component({
  selector: 'app-new-purchase-entry-form',
  imports: [],
  templateUrl: './new-purchase-entry-form.html',
  styleUrl: './new-purchase-entry-form.css',
})
export class NewPurchaseEntryForm {
  close = output<void>();
  save = output<Omit<PurchaseEntryRecord, 'id'>>();

  supplier = signal('');
  description = signal('');
  category = signal('Raw Materials');
  orderDate = signal('2026-11-19');
  expectedDelivery = signal('2026-11-23');
  totalAmount = signal<number | null>(null);
  status = signal<PurchaseOrderStatus>('Pending Approval');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (
      !this.supplier().trim() ||
      !this.description().trim() ||
      !this.totalAmount() ||
      this.totalAmount()! <= 0
    ) {
      return;
    }

    this.save.emit({
      supplier: this.supplier().trim(),
      description: this.description().trim(),
      category: this.category(),
      orderDate: this.orderDate(),
      expectedDelivery: this.expectedDelivery(),
      totalAmount: Number(this.totalAmount()),
      status: this.status(),
    });
  }
}