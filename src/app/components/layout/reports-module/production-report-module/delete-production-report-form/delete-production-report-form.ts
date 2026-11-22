import { Component, input, output } from '@angular/core';
import { ProductionReportRecord } from '../production-report-list-widget/production-report-list-widget';

@Component({
  selector: 'app-delete-production-report-form',
  imports: [],
  templateUrl: './delete-production-report-form.html',
  styleUrl: './delete-production-report-form.css',
})
export class DeleteProductionReportForm {
  report = input.required<ProductionReportRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}