import { Component } from '@angular/core';

@Component({
  selector: 'app-pipeline-analytics-widget',
  imports: [],
  templateUrl: './pipeline-analytics-widget.html',
  styleUrl: './pipeline-analytics-widget.css',
})
export class PipelineAnalyticsWidget {
  funnelStages = [
    { label: 'Lead / Qualification', count: 34, value: 2480000, conversion: 100, color: '#17304f' },
    { label: 'Volume Assessment', count: 24, value: 1840000, conversion: 70.6, color: '#1b5a9a' },
    { label: 'Quotation Sent', count: 16, value: 1320000, conversion: 66.7, color: '#2563eb' },
    { label: 'Price & Terms Negotiation', count: 9, value: 890000, conversion: 56.3, color: '#0891b2' },
    { label: 'Closed Won', count: 6, value: 645000, conversion: 66.7, color: '#059669' },
  ];

  stalledDeals = [
    {
      id: 'OPP-2026-0416',
      customerCode: 'C-FB-0019',
      client: 'Sandton Events & Catering',
      stage: 'Quotation Sent',
      daysIdle: 9,
      slaLimit: 7,
      value: 94500,
      owner: 'K. Sithole',
      blocker: 'Awaiting procurement sign-off',
    },
    {
      id: 'OPP-2026-0412',
      customerCode: 'C-RET-0029',
      client: 'Gauteng Forecourt Holdings',
      stage: 'Quotation Sent',
      daysIdle: 8,
      slaLimit: 7,
      value: 285000,
      owner: 'L. Ndlovu',
      blocker: 'Margin below 18% floor — needs tier review',
    },
    {
      id: 'OPP-2026-0404',
      customerCode: 'C-RES-0007',
      client: 'East Rand Wholesale Depot',
      stage: 'Negotiation',
      daysIdle: 11,
      slaLimit: 5,
      value: 410000,
      owner: 'T. Mokoena',
      blocker: 'Delivery schedule & cold-storage SLA terms',
    },
  ];

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}