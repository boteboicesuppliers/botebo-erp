import { Component, computed, signal } from '@angular/core';
import { NewJournalEntryForm } from '../new-journal-entry-form/new-journal-entry-form';
import { EditJournalEntryForm } from '../edit-journal-entry-form/edit-journal-entry-form';
import { DeleteJournalEntryForm } from '../delete-journal-entry-form/delete-journal-entry-form';

export type JournalType = 'CRJ' | 'CPJ' | 'PJ' | 'SJ' | 'GJ';
export type AccountNormalSide = 'Debit' | 'Credit';
export type ErpSourceModule =
  | 'Purchases / GRN'
  | 'Sales / Invoices'
  | 'Staff & Attendance'
  | 'Inventory'
  | 'Manual Contingency';

export interface JournalEntryRecord {
  id: string;
  entryDate: string;
  journal: JournalType;
  sourceModule: ErpSourceModule;
  sourceRef: string;
  accountCode: string;
  accountName: string;
  normalSide: AccountNormalSide;
  debitAmount: number;
  creditAmount: number;
  location: string;
  description: string;
}

@Component({
  selector: 'app-journals-list-widget',
  imports: [
    NewJournalEntryForm,
    EditJournalEntryForm,
    DeleteJournalEntryForm,
  ],
  templateUrl: './journals-list-widget.html',
  styleUrl: './journals-list-widget.css',
})
export class JournalsListWidget {
  showNewModal = signal(false);
  editingEntry = signal<JournalEntryRecord | null>(null);
  deletingEntry = signal<JournalEntryRecord | null>(null);

  selectedJournal = signal<string>('All');
  selectedSource = signal<string>('All');
  searchQuery = signal('');
  currentPage = signal(1);
  pageSize = 6;

  readonly journalTabs: { code: string; label: string }[] = [
    { code: 'All', label: 'All Journals' },
    { code: 'CRJ', label: 'Cash Receipts (CRJ)' },
    { code: 'CPJ', label: 'Cash Payments (CPJ)' },
    { code: 'PJ', label: 'Purchases (PJ)' },
    { code: 'SJ', label: 'Sales (SJ)' },
    { code: 'GJ', label: 'General (GJ)' },
  ];

  journalEntries = signal<JournalEntryRecord[]>([
    {
      id: 'JRN-2026-001',
      entryDate: '2026-11-19',
      journal: 'CPJ',
      sourceModule: 'Purchases / GRN',
      sourceRef: 'GRN-2026-019',
      accountCode: '1210',
      accountName: 'Packaging & Bagging Stock',
      normalSide: 'Debit',
      debitAmount: 8200.0,
      creditAmount: 0,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: 'Cash/EFT purchase of ice bags & pallet wrap',
    },
    {
      id: 'JRN-2026-002',
      entryDate: '2026-11-19',
      journal: 'CPJ',
      sourceModule: 'Purchases / GRN',
      sourceRef: 'GRN-2026-019',
      accountCode: '1010',
      accountName: 'Bank Operating Account',
      normalSide: 'Debit',
      debitAmount: 0,
      creditAmount: 8200.0,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: 'EFT payment for GRN-2026-019',
    },
    {
      id: 'JRN-2026-003',
      entryDate: '2026-11-19',
      journal: 'PJ',
      sourceModule: 'Purchases / GRN',
      sourceRef: 'PO-2026-088',
      accountCode: '1220',
      accountName: 'Ammonia & Chiller Consumables',
      normalSide: 'Debit',
      debitAmount: 14500.0,
      creditAmount: 0,
      location: '88 Voortrekker St, Sasolburg',
      description: 'Credit purchase from industrial refrigerant supplier',
    },
    {
      id: 'JRN-2026-004',
      entryDate: '2026-11-19',
      journal: 'PJ',
      sourceModule: 'Purchases / GRN',
      sourceRef: 'PO-2026-088',
      accountCode: '2010',
      accountName: 'Accounts Payable (Creditors)',
      normalSide: 'Credit',
      debitAmount: 0,
      creditAmount: 14500.0,
      location: '88 Voortrekker St, Sasolburg',
      description: 'Supplier credit liability for PO-2026-088',
    },
    {
      id: 'JRN-2026-005',
      entryDate: '2026-11-18',
      journal: 'SJ',
      sourceModule: 'Sales / Invoices',
      sourceRef: 'INV-2026-042',
      accountCode: '1100',
      accountName: 'Accounts Receivable (Debtors)',
      normalSide: 'Debit',
      debitAmount: 24500.0,
      creditAmount: 0,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: 'Credit ice supply invoice to hospitality account',
    },
    {
      id: 'JRN-2026-006',
      entryDate: '2026-11-18',
      journal: 'SJ',
      sourceModule: 'Sales / Invoices',
      sourceRef: 'INV-2026-042',
      accountCode: '4000',
      accountName: 'Ice Sales Revenue',
      normalSide: 'Credit',
      debitAmount: 0,
      creditAmount: 24500.0,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: 'Sales revenue recognized for INV-2026-042',
    },
    {
      id: 'JRN-2026-007',
      entryDate: '2026-11-18',
      journal: 'CRJ',
      sourceModule: 'Sales / Invoices',
      sourceRef: 'RCT-2026-014',
      accountCode: '1010',
      accountName: 'Bank Operating Account',
      normalSide: 'Debit',
      debitAmount: 19800.0,
      creditAmount: 0,
      location: '14 Industrial Blvd, Sebokeng, Vereeniging',
      description: 'Customer cash/EFT receipt received',
    },
    {
      id: 'JRN-2026-008',
      entryDate: '2026-11-18',
      journal: 'CRJ',
      sourceModule: 'Sales / Invoices',
      sourceRef: 'RCT-2026-014',
      accountCode: '1100',
      accountName: 'Accounts Receivable (Debtors)',
      normalSide: 'Debit',
      debitAmount: 0,
      creditAmount: 19800.0,
      location: '14 Industrial Blvd, Sebokeng, Vereeniging',
      description: 'Debtor balance settled by RCT-2026-014',
    },
    {
      id: 'JRN-2026-009',
      entryDate: '2026-11-17',
      journal: 'GJ',
      sourceModule: 'Staff & Attendance',
      sourceRef: 'ATT-2026-001',
      accountCode: '5200',
      accountName: 'Staff Wages & Overtime',
      normalSide: 'Debit',
      debitAmount: 5120.0,
      creditAmount: 0,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: 'Shift wages & overtime accrual from attendance logs',
    },
    {
      id: 'JRN-2026-010',
      entryDate: '2026-11-17',
      journal: 'GJ',
      sourceModule: 'Staff & Attendance',
      sourceRef: 'ATT-2026-001',
      accountCode: '2150',
      accountName: 'Wages & Overtime Accruals',
      normalSide: 'Credit',
      debitAmount: 0,
      creditAmount: 5120.0,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: 'Accrued payroll liability for shift hours',
    },
  ]);

  filteredEntries = computed(() => {
    const j = this.selectedJournal();
    const src = this.selectedSource();
    const q = this.searchQuery().toLowerCase().trim();

    return this.journalEntries().filter((entry) => {
      const matchesJournal = j === 'All' || entry.journal === j;
      const matchesSource = src === 'All' || entry.sourceModule === src;
      const matchesQuery =
        !q ||
        entry.id.toLowerCase().includes(q) ||
        entry.sourceRef.toLowerCase().includes(q) ||
        entry.accountName.toLowerCase().includes(q) ||
        entry.accountCode.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.location.toLowerCase().includes(q);
      return matchesJournal && matchesSource && matchesQuery;
    });
  });

  totalDebits = computed(() =>
    this.filteredEntries().reduce((sum, e) => sum + e.debitAmount, 0)
  );

  totalCredits = computed(() =>
    this.filteredEntries().reduce((sum, e) => sum + e.creditAmount, 0)
  );

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredEntries().length / this.pageSize))
  );
  totalPagesArray = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );
  startIndex = computed(() =>
    this.filteredEntries().length === 0
      ? 0
      : (this.currentPage() - 1) * this.pageSize + 1
  );
  endIndex = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.filteredEntries().length)
  );

  paginatedEntries = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredEntries().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  handleCreateEntry(data: Omit<JournalEntryRecord, 'id'>) {
    const nextNum = this.journalEntries().length + 1;
    const created: JournalEntryRecord = {
      id: `JRN-2026-${String(nextNum).padStart(3, '0')}`,
      ...data,
    };
    this.journalEntries.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateEntry(updated: JournalEntryRecord) {
    this.journalEntries.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingEntry.set(null);
  }

  handleDeleteEntry(id: string) {
    this.journalEntries.update((list) => list.filter((item) => item.id !== id));
    this.deletingEntry.set(null);
  }

  formatZar(amount: number): string {
    return `R ${amount.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}