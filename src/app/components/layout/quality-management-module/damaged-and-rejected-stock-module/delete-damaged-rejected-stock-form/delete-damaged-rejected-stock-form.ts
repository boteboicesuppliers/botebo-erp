import { Component, input, output } from '@angular/core';
import { DamagedRejectedStockRecord } from '../damaged-and-rejected-stock-list-widget/damaged-and-rejected-stock-list-widget';

@Component({
  selector: 'app-delete-damaged-rejected-stock-form',
  imports: [],
  templateUrl: './delete-damaged-rejected-stock-form.html',
  styleUrl: './delete-damaged-rejected-stock-form.css',
})
export class DeleteDamagedRejectedStockForm {
  record = input.required<DamagedRejectedStockRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}