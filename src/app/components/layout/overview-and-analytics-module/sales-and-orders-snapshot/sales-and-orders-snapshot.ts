import { Component, computed, signal } from '@angular/core';

interface SalesSnapshotRow {
  id: string;
  orderOrInvoice: string;
  customer: string;
  itemsSummary: string;
  stage: 'Quotation' | 'Sales Order' | 'Invoiced';
  amount: number;
  date: string;
}

@Component({
  selector: 'app-sales-and-orders-snapshot-view',
  imports: [],
  templateUrl: './sales-and-orders-snapshot.html',
  styleUrl: './sales-and-orders-snapshot.css',
})
export class SalesAndOrdersSnapshot {
  stageFilter = signal<'All' | SalesSnapshotRow['stage']>('All');

  records = signal<SalesSnapshotRow[]>([
    {
      id: 'SN-1',
      orderOrInvoice: 'INV-2026-308',
      customer: 'Suncrest Hospitality Group',
      itemsSummary: '240 x 2kg Party Cube Ice',
      stage: 'Invoiced',
      amount: 6480,
      date: '2026-11-22',
    },
    {
      id: 'SN-2',
      orderOrInvoice: 'SO-2026-1091',
      customer: 'Highveld Liquor & Mart',
      itemsSummary: '350 x 5kg Commercial Ice',
      stage: 'Sales Order',
      amount: 12950,
      date: '2026-11-22',
    },
    {
      id: 'SN-3',
      orderOrInvoice: 'QT-2026-0514',
      customer: 'AquaCold Events & Catering',
      itemsSummary: '160 x 10kg Block Ice',
      stage: 'Quotation',
      amount: 9600,
      date: '2026-11-21',
    },
    {
      id: 'SN-4',
      orderOrInvoice: 'SO-2026-1094',
      customer: 'Metro Forecourt & Convenience',
      itemsSummary: '500 x 2kg Party Cube Ice',
      stage: 'Sales Order',
      amount: 13500,
      date: '2026-11-22',
    },
  ]);

  filteredRecords = computed(() => {
    const stage = this.stageFilter();
    if (stage === 'All') return this.records();
    return this.records().filter((r) => r.stage === stage);
  });

  totalValue = computed(() =>
    this.filteredRecords().reduce((sum, r) => sum + r.amount, 0)
  );
}