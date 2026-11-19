import { Component, input, output } from '@angular/core';
import { PurchaseEntryRecord } from '../purchases-list-widget/purchases-list-widget';

@Component({
  selector: 'app-delete-purchase-entry-form',
  imports: [],
  templateUrl: './delete-purchase-entry-form.html',
  styleUrl: './delete-purchase-entry-form.css',
})
export class DeletePurchaseEntryForm {
  entry = input.required<PurchaseEntryRecord>();
  close = output<void>();
  confirmDelete = output<string>();

  formatCurrency(amount: number): string {
    return 'R ' + amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}