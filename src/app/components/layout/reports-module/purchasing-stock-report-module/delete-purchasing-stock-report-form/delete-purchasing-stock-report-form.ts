import { Component, input, output } from '@angular/core';
import { PurchasingStockReportRecord } from '../purchasing-stock-report-list-widget/purchasing-stock-report-list-widget';

@Component({
  selector: 'app-delete-purchasing-stock-report-form',
  imports: [],
  templateUrl: './delete-purchasing-stock-report-form.html',
  styleUrl: './delete-purchasing-stock-report-form.css',
})
export class DeletePurchasingStockReportForm {
  report = input.required<PurchasingStockReportRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}