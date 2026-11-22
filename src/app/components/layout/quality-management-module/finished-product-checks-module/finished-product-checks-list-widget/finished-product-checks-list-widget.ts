import { Component, computed, signal } from '@angular/core';
import { NewFinishedProductCheckForm } from '../new-finished-product-check-form/new-finished-product-check-form';
import { EditFinishedProductCheckForm } from '../edit-finished-product-check-form/edit-finished-product-check-form';
import { DeleteFinishedProductCheckForm } from '../delete-finished-product-check-form/delete-finished-product-check-form';

export type CheckResultStatus = 'Passed' | 'Conditional Pass' | 'Failed';

export interface FinishedProductCheckRecord {
  id: string;
  checkCode: string;
  productName: string;
  batchNumber: string;
  coreTempC: number;
  bagWeightCheck: string;
  sealAndClarityPass: boolean;
  result: CheckResultStatus;
  checkedDate: string;
  inspector: string;
  notes: string;
}

@Component({
  selector: 'app-finished-product-checks-list-widget',
  imports: [
    NewFinishedProductCheckForm,
    EditFinishedProductCheckForm,
    DeleteFinishedProductCheckForm,
  ],
  templateUrl: './finished-product-checks-list-widget.html',
  styleUrl: './finished-product-checks-list-widget.css',
})
export class FinishedProductChecksListWidget {
  resultFilter = signal<'All' | CheckResultStatus>('All');
  searchQuery = signal('');

  showNewModal = signal(false);
  editingCheck = signal<FinishedProductCheckRecord | null>(null);
  deletingCheck = signal<FinishedProductCheckRecord | null>(null);

  checks = signal<FinishedProductCheckRecord[]>([
    {
      id: 'FPC-1',
      checkCode: 'QCF-2026-041',
      productName: '2kg Party Cube Ice Bag',
      batchNumber: 'BCH-ICE-1120A',
      coreTempC: -6.5,
      bagWeightCheck: '2.02 kg avg (10 samples)',
      sealAndClarityPass: true,
      result: 'Passed',
      checkedDate: '2026-11-20',
      inspector: 'N. Khumalo',
      notes: 'Crystal-clear cubes, strong heat seals.',
    },
    {
      id: 'FPC-2',
      checkCode: 'QCF-2026-042',
      productName: '5kg Commercial Cube Ice Bag',
      batchNumber: 'BCH-ICE-1120B',
      coreTempC: -4.2,
      bagWeightCheck: '4.96 kg avg (10 samples)',
      sealAndClarityPass: true,
      result: 'Conditional Pass',
      checkedDate: '2026-11-20',
      inspector: 'N. Khumalo',
      notes: 'Slightly warm core; hold in cold room 2h before dispatch.',
    },
    {
      id: 'FPC-3',
      checkCode: 'QCF-2026-043',
      productName: '10kg Block Ice',
      batchNumber: 'BCH-BLK-1119A',
      coreTempC: -2.1,
      bagWeightCheck: '9.65 kg avg (5 blocks)',
      sealAndClarityPass: false,
      result: 'Failed',
      checkedDate: '2026-11-19',
      inspector: 'P. Sithole',
      notes: 'Underweight blocks and minor cracking; routed to reject log.',
    },
  ]);

  filteredChecks = computed(() => {
    const res = this.resultFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.checks().filter((c) => {
      const matchesResult = res === 'All' || c.result === res;
      const matchesQuery =
        !q ||
        c.checkCode.toLowerCase().includes(q) ||
        c.productName.toLowerCase().includes(q) ||
        c.batchNumber.toLowerCase().includes(q) ||
        c.inspector.toLowerCase().includes(q);
      return matchesResult && matchesQuery;
    });
  });

  addCheck(payload: Omit<FinishedProductCheckRecord, 'id'>): void {
    this.checks.update((list) => [{ id: `FPC-${Date.now()}`, ...payload }, ...list]);
    this.showNewModal.set(false);
  }

  updateCheck(updated: FinishedProductCheckRecord): void {
    this.checks.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingCheck.set(null);
  }

  deleteCheck(id: string): void {
    this.checks.update((list) => list.filter((item) => item.id !== id));
    this.deletingCheck.set(null);
  }
}