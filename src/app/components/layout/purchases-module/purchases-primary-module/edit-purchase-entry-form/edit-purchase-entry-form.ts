import { Component, effect, input, output, signal } from '@angular/core';
import {
  PurchaseEntryRecord,
  PurchaseOrderStatus,
} from '../purchases-list-widget/purchases-list-widget';

@Component({
  selector: 'app-edit-purchase-entry-form',
  imports: [],
  templateUrl: './edit-purchase-entry-form.html',
  styleUrl: './edit-purchase-entry-form.css',
})
export class EditPurchaseEntryForm {
  entry = input.required<PurchaseEntryRecord>();
  close = output<void>();
  save = output<PurchaseEntryRecord>();

  supplier = signal('');
  description = signal('');
  category = signal('');
  orderDate = signal('');
  expectedDelivery = signal('');
  totalAmount = signal<number>(0);
  status = signal<PurchaseOrderStatus>('Pending Approval');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.entry();
      this.supplier.set(current.supplier);
      this.description.set(current.description);
      this.category.set(current.category);
      this.orderDate.set(current.orderDate);
      this.expectedDelivery.set(current.expectedDelivery);
      this.totalAmount.set(current.totalAmount);
      this.status.set(current.status);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.supplier().trim() || !this.description().trim() || this.totalAmount() <= 0) {
      return;
    }

    const current = this.entry();
    this.save.emit({
      ...current,
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