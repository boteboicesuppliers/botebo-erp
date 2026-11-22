import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface QualityOverviewMetrics {
  rawMaterialChecks: number;
  finishedProductChecks: number;
  rejectedStockEntries: number;
  passRatePercent: number;
  quarantinedUnits: number;
}

export interface QualityRecentActivity {
  id: string;
  code: string;
  area: 'Raw Materials' | 'Finished Goods' | 'Rejected Stock';
  subject: string;
  outcome: string;
  date: string;
  inspector: string;
}

@Component({
  selector: 'app-quality-management-primary-view',
  imports: [RouterLink],
  templateUrl: './quality-management-primary.html',
  styleUrl: './quality-management-primary.css',
})
export class QualityManagementPrimary {
  metrics = signal<QualityOverviewMetrics>({
    rawMaterialChecks: 18,
    finishedProductChecks: 43,
    rejectedStockEntries: 3,
    passRatePercent: 95,
    quarantinedUnits: 65,
  });

  recentLogs = signal<QualityRecentActivity[]>([
    {
      id: 'QL-1',
      code: 'QCF-2026-041',
      area: 'Finished Goods',
      subject: '2kg Party Cube Ice Bag (BCH-ICE-1120A)',
      outcome: 'Passed',
      date: '2026-11-20',
      inspector: 'N. Khumalo',
    },
    {
      id: 'QL-2',
      code: 'QCR-2026-028',
      area: 'Raw Materials',
      subject: 'RO Filtration & Purification Cartridges (GRN-2026-104)',
      outcome: 'Approved',
      date: '2026-11-20',
      inspector: 'K. Mahlangu',
    },
    {
      id: 'QL-3',
      code: 'REJ-2026-014',
      area: 'Rejected Stock',
      subject: '2kg Party Cube Ice Bag — Torn poly bags (48 Bags)',
      outcome: 'Scrap / Melt',
      date: '2026-11-20',
      inspector: 'T. Dlamini',
    },
  ]);

  areaFilter = signal<'All' | QualityRecentActivity['area']>('All');

  filteredLogs = computed(() => {
    const area = this.areaFilter();
    if (area === 'All') return this.recentLogs();
    return this.recentLogs().filter((log) => log.area === area);
  });
}