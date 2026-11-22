import { Component } from '@angular/core';
import { PurchasingStockReportListWidget } from '../../../layout/reports-module/purchasing-stock-report-module/purchasing-stock-report-list-widget/purchasing-stock-report-list-widget';

@Component({
  selector: 'app-purchasing-stock-report',
  imports: [PurchasingStockReportListWidget],
  templateUrl: './purchasing-stock-report.html',
  styleUrl: './purchasing-stock-report.css',
})
export class PurchasingStockReport {}