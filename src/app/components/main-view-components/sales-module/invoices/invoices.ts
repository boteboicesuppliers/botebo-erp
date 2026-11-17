import { Component } from '@angular/core';
import { InvoiceKpiOverview } from '../../../layout/sales-module/invoices/invoice-kpi-overview/invoice-kpi-overview';
import { InvoiceAgingWidget } from '../../../layout/sales-module/invoices/invoice-aging-widget/invoice-aging-widget';
import { InvoiceListWidget } from '../../../layout/sales-module/invoices/invoice-list-widget/invoice-list-widget';

@Component({
  selector: 'app-invoices',
  imports: [
    InvoiceKpiOverview,
    InvoiceAgingWidget,
    InvoiceListWidget,
  ],
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class Invoices {
  // Main container logic for Invoices module
}