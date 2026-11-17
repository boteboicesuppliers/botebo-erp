import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-invoice-kpi-overview',
  imports: [],
  templateUrl: './invoice-kpi-overview.html',
  styleUrl: './invoice-kpi-overview.css',
})
export class InvoiceKpiOverview {
  readonly windows = ['MTD', 'QTD'] as const;
  window = signal<'MTD' | 'QTD'>('MTD');

  private kpiData = {
    MTD: { outstanding: 1420000, collected: 2150000, overdue: 310000, totalCount: 34 },
    QTD: { outstanding: 3850000, collected: 6420000, overdue: 780000, totalCount: 92 },
  };

  summary = computed(() => this.kpiData[this.window()]);

  dso = {
    days: 28.4,
    target: 30.0,
    change: '-2.1 days',
  };

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}