import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-sales-order-kpi-overview',
  imports: [],
  templateUrl: './sales-order-kpi-overview.html',
  styleUrl: './sales-order-kpi-overview.css',
})
export class SalesOrderKpiOverview {
  readonly windows = ['MTD', 'QTD'] as const;
  window = signal<'MTD' | 'QTD'>('MTD');

  private metricsData = {
    MTD: { activeValue: 1840000, totalOrders: 28, fulfilled: 19, processing: 9 },
    QTD: { activeValue: 5210000, totalOrders: 76, fulfilled: 58, processing: 18 },
  };

  summary = computed(() => this.metricsData[this.window()]);

  slaCompliance = {
    rate: 96.4,
    target: 95.0,
    avgDispatchHours: 36.2,
    onTimeCount: 27,
    delayedCount: 1,
  };

  revenueCollection = {
    invoicedRatio: 88.5,
    pendingInvoicing: 212000,
  };

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}