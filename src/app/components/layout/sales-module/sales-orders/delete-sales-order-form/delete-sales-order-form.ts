import { Component, input, output, signal } from '@angular/core';
import { SalesOrderRecord } from '../sales-order-list-widget/sales-order-list-widget';

@Component({
  selector: 'app-delete-sales-order-form',
  imports: [],
  templateUrl: './delete-sales-order-form.html',
  styleUrl: './delete-sales-order-form.css',
})
export class DeleteSalesOrderForm {
  order = input.required<SalesOrderRecord>();
  close = output<void>();
  confirmDelete = output<string>();

  reason = signal('Client requested order cancellation');
}