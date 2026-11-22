import { Component, computed, signal } from '@angular/core';

interface DailyOperationRow {
  id: string;
  reference: string;
  module: 'Production' | 'Purchases' | 'Quality' | 'Logistics';
  summary: string;
  owner: string;
  status: 'In Progress' | 'Completed' | 'Attention';
  updatedAt: string;
}

@Component({
  selector: 'app-daily-operations-view',
  imports: [],
  templateUrl: './daily-operations.html',
  styleUrl: './daily-operations.css',
})
export class DailyOperations {
  searchQuery = signal('');
  moduleFilter = signal<'All' | DailyOperationRow['module']>('All');

  operations = signal<DailyOperationRow[]>([
    {
      id: 'OP-1',
      reference: 'BCH-ICE-1122A',
      module: 'Production',
      summary: '2kg Party Cube Ice Bag — Line 01 run (1,450 bags)',
      owner: 'Shift A - Line 01',
      status: 'In Progress',
      updatedAt: 'Today, 09:40',
    },
    {
      id: 'OP-2',
      reference: 'GRN-2026-109',
      module: 'Purchases',
      summary: 'Food-grade 2kg poly bag rolls — Cold Store A check',
      owner: 'Receiving Desk',
      status: 'Completed',
      updatedAt: 'Today, 08:15',
    },
    {
      id: 'OP-3',
      reference: 'QCF-2026-044',
      module: 'Quality',
      summary: 'Core freeze temperature & seal integrity inspection',
      owner: 'QC Inspector',
      status: 'Attention',
      updatedAt: 'Today, 10:05',
    },
    {
      id: 'OP-4',
      reference: 'DLV-2026-214',
      module: 'Logistics',
      summary: 'Morning hospitality & retail route dispatch',
      owner: 'Fleet Zone 01',
      status: 'In Progress',
      updatedAt: 'Today, 07:50',
    },
  ]);

  filteredOperations = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const mod = this.moduleFilter();

    return this.operations().filter((op) => {
      const matchesModule = mod === 'All' || op.module === mod;
      const matchesQuery =
        !q ||
        op.reference.toLowerCase().includes(q) ||
        op.module.toLowerCase().includes(q) ||
        op.summary.toLowerCase().includes(q) ||
        op.owner.toLowerCase().includes(q) ||
        op.status.toLowerCase().includes(q);
      return matchesModule && matchesQuery;
    });
  });

  badgeClass(status: DailyOperationRow['status']): string {
    switch (status) {
      case 'Completed':
        return 'border border-[#bbf7d0] bg-[#dcfce7] text-[#15803d]';
      case 'Attention':
        return 'border border-[#fde68a] bg-[#fef3c7] text-[#b45309]';
      default:
        return 'border border-[#bfdbfe] bg-[#dbeafe] text-[#1d4ed8]';
    }
  }
}