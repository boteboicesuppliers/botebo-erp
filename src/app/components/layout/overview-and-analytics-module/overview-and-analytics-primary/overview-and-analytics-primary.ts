import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface OverviewKpi {
  label: string;
  value: string;
  subtext: string;
  route: string;
  linkLabel: string;
}

@Component({
  selector: 'app-overview-and-analytics-primary-view',
  imports: [RouterLink],
  templateUrl: './overview-and-analytics-primary.html',
  styleUrl: './overview-and-analytics-primary.css',
})
export class OverviewAndAnalyticsPrimary {
  kpis = signal<OverviewKpi[]>([
    {
      label: 'Daily Operations Queue',
      value: '12 Active',
      subtext: 'Batches, GRNs, and scheduled deliveries',
      route: '/overview/daily-operations',
      linkLabel: 'Open Daily Operations',
    },
    {
      label: 'Sales & Orders Snapshot',
      value: 'R 42,530',
      subtext: 'Open quotations, active orders, and invoices',
      route: '/overview/sales-snapshot',
      linkLabel: 'Open Sales Snapshot',
    },
    {
      label: 'Production Output (Today)',
      value: '1,660 Units',
      subtext: 'Cube & block ice lines running',
      route: '/production',
      linkLabel: 'Go to Production',
    },
    {
      label: 'Reports & Analytics',
      value: '3 Streams',
      subtext: 'Production, Purchasing & Stock, Sales',
      route: '/reports',
      linkLabel: 'Go to Reports',
    },
  ]);
}