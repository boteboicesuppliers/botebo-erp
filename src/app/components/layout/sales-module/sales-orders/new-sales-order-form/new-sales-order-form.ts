import { Component, output, signal } from '@angular/core';
import { OrderStatus, SalesOrderRecord } from '../sales-order-list-widget/sales-order-list-widget';

@Component({
  selector: 'app-new-sales-order-form',
  imports: [],
  templateUrl: './new-sales-order-form.html',
  styleUrl: './new-sales-order-form.css',
})
export class NewSalesOrderForm {
  close = output<void>();
  save = output<Omit<SalesOrderRecord, 'id'>>();

  customerCode = signal('C-RES-0045');
  client = signal('');
  tier = signal('Tier 1 · Bulk Wholesale');
  status = signal<OrderStatus>('Confirmed');
  warehouse = signal('Johannesburg Cold Store');
  orderDate = signal('2026-11-17');
  deliveryDate = signal('2026-11-20');
  value = signal<number | null>(null);
  isUrgent = signal(false);
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.client().trim() || !this.value() || this.value()! <= 0) {
      return;
    }

    this.save.emit({
      customerCode: this.customerCode().trim() || 'C-RES-0000',
      client: this.client().trim(),
      tier: this.tier(),
      status: this.status(),
      warehouse: this.warehouse(),
      orderDate: this.orderDate(),
      deliveryDate: this.deliveryDate(),
      value: Number(this.value()),
      isUrgent: this.isUrgent(),
    });
  }
}