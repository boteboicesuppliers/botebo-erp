import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-aging-widget',
  imports: [],
  templateUrl: './invoice-aging-widget.html',
  styleUrl: './invoice-aging-widget.css',
})
export class InvoiceAgingWidget {
  agingBrackets = [
    { label: 'Current (0–30 Days)', amount: 1110000, percentage: 78.2, color: '#1b5a9a' },
    { label: '31–60 Days Overdue', amount: 195000, percentage: 13.7, color: '#0891b2' },
    { label: '61–90 Days Overdue', amount: 85000, percentage: 6.0, color: '#d97706' },
    { label: '90+ Days Overdue (Legal Hold)', amount: 30000, percentage: 2.1, color: '#dc2626' },
  ];

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}