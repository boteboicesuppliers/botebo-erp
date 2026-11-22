import { Component } from '@angular/core';
import { SalesReportListWidget } from '../../../layout/reports-module/sales-report-module/sales-report-list-widget/sales-report-list-widget';

@Component({
  selector: 'app-sales-report',
  imports: [SalesReportListWidget],
  templateUrl: './sales-report.html',
  styleUrl: './sales-report.css',
})
export class SalesReport {}