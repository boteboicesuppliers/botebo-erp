import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-pipeline-kpi-overview',
  imports: [],
  templateUrl: './pipeline-kpi-overview.html',
  styleUrl: './pipeline-kpi-overview.css',
})
export class PipelineKpiOverview {
  readonly windows = ['MTD', 'QTD'] as const;
  window = signal<'MTD' | 'QTD'>('MTD');

  private pipelineTotals = {
    MTD: { activeValue: 2480000, deals: 34, weighted: 1412000, target: 1500000 },
    QTD: { activeValue: 6850000, deals: 89, weighted: 4190000, target: 4000000 },
  };

  summary = computed(() => {
    const data = this.pipelineTotals[this.window()];
    return {
      ...data,
      forecastProgress: Math.min(100, Math.round((data.weighted / data.target) * 100)),
      forecastVariance: Math.round(((data.weighted - data.target) / data.target) * 1000) / 10,
    };
  });

  winRate = {
    rate: 38.4,
    won: 43,
    lost: 69,
    target: 35.0,
    change: '+3.1',
  };

  velocity = {
    avgDays: 14.2,
    targetDays: 16.0,
    change: '-1.8',
    stages: [
      { label: 'Lead to Qualify', days: 2.4, color: '#17304f' },
      { label: 'Assessment', days: 3.1, color: '#1b5a9a' },
      { label: 'Quote Review', days: 5.2, color: '#9fb3c8' },
      { label: 'Negotiation', days: 3.5, color: '#b8cbe0' },
    ],
  };

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}