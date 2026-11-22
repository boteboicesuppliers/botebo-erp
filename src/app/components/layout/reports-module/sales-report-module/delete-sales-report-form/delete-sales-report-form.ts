import { Component, input, output } from '@angular/core';
import { SalesReportRecord } from '../sales-report-list-widget/sales-report-list-widget';

@Component({
  selector: 'app-delete-sales-report-form',
  imports: [],
  templateUrl: './delete-sales-report-form.html',
  styleUrl: './delete-sales-report-form.css',
})
export class DeleteSalesReportForm {
  report = input.required<SalesReportRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}