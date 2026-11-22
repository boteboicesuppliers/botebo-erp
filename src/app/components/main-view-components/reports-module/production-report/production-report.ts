import { Component } from '@angular/core';
import { ProductionReportListWidget } from '../../../layout/reports-module/production-report-module/production-report-list-widget/production-report-list-widget';

@Component({
  selector: 'app-production-report',
  imports: [ProductionReportListWidget],
  templateUrl: './production-report.html',
  styleUrl: './production-report.css',
})
export class ProductionReport {}