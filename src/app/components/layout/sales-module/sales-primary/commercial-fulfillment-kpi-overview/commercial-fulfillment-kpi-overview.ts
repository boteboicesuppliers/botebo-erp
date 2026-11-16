import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-commercial-fulfillment-kpi-overview',
  imports: [],
  templateUrl: './commercial-fulfillment-kpi-overview.html',
  styleUrl: './commercial-fulfillment-kpi-overview.css',
})
export class CommercialFulfillmentKpiOverview {
  // GROSS SALES (MTD / YTD)
  readonly periods = ['MTD', 'YTD'] as const;
  period = signal<'MTD' | 'YTD'>('MTD');

  private salesData = {
    MTD: { value: 1284500, target: 1200000 },
    YTD: { value: 12640000, target: 13200000 },
  };

  sales = computed(() => {
    const { value, target } = this.salesData[this.period()];
    return {
      value,
      target,
      progress: Math.min(100, Math.round((value / target) * 100)),
      variance: Math.round(((value - target) / target) * 1000) / 10,
    };
  });

  // ORDER-TO-FULFILMENT CYCLE TIME
  cycle = {
    total: 26.4,
    target: 24,
    change: '-2.1',
    stages: [
      { label: 'Confirmation to allocation', hours: 4.2, color: '#17304f' },
      { label: 'Picking and packing', hours: 11.6, color: '#1b5a9a' },
      { label: 'Staging', hours: 5.8, color: '#9fb3c8' },
      { label: 'Bay loading', hours: 4.8, color: '#b8cbe0' },
    ],
  };

  // ORDER FULFILMENT RATE
  fulfilment = { full: 412, delayed: 37, target: 95, change: '+1.4' };
  rate = computed(() => Math.round((this.fulfilment.full / (this.fulfilment.full + this.fulfilment.delayed)) * 1000) / 10);

  // GROSS PROFIT MARGIN TRACKER
  margin = {
    current: 23.6,
    floor: 18,
    target: 25,
    scale: 40,
    inputCost: 'up 3.2%',
    change: '-0.8',
    tiers: [
      { label: 'Tier 1 · Bulk wholesale', value: 17.6 },
      { label: 'Tier 2 · Contract', value: 22.8 },
      { label: 'Tier 3 · Standard', value: 27.1 },
    ],
  };

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}