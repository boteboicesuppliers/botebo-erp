import { Component, effect, input, output, signal } from '@angular/core';
import { OrderStatus, SalesOrderRecord } from '../sales-order-list-widget/sales-order-list-widget';

@Component({
  selector: 'app-edit-sales-order-form',
  imports: [],
  templateUrl: './edit-sales-order-form.html',
  styleUrl: './edit-sales-order-form.css',
})
export class EditSalesOrderForm {
  order = input.required<SalesOrderRecord>();
  close = output<void>();
  save = output<SalesOrderRecord>();

  client = signal('');
  tier = signal('');
  status = signal<OrderStatus>('Confirmed');
  warehouse = signal('');
  deliveryDate = signal('');
  value = signal(0);
  isUrgent = signal(false);

  constructor() {
    effect(() => {
      const o = this.order();
      this.client.set(o.client);
      this.tier.set(o.tier);
      this.status.set(o.status);
      this.warehouse.set(o.warehouse);
      this.deliveryDate.set(o.deliveryDate);
      this.value.set(o.value);
      this.isUrgent.set(o.isUrgent);
    });
  }

  submitEdit() {
    const current = this.order();
    this.save.emit({
      ...current,
      client: this.client().trim() || current.client,
      tier: this.tier(),
      status: this.status(),
      warehouse: this.warehouse(),
      deliveryDate: this.deliveryDate(),
      value: Number(this.value()),
      isUrgent: this.isUrgent(),
    });
  }
}