import { Component, computed, signal } from '@angular/core';
import { NewJournalEntryForm } from '../new-journal-entry-form/new-journal-entry-form';
import { EditJournalEntryForm } from '../edit-journal-entry-form/edit-journal-entry-form';
import { DeleteJournalEntryForm } from '../delete-journal-entry-form/delete-journal-entry-form';
import {
  ErpSourceModule,
  JournalEntryRecord,
  JournalType,
} from '../journals-list-widget/journals-list-widget';

export interface LedgerAccountDefinition {
  code: string;
  name: string;
  normalSide: 'Debit' | 'Credit';
  openingBalance: number;
}

export interface LedgerMovementLine {
  id: string;
  date: string;
  ref: string;
  journal: JournalType;
  sourceModule: ErpSourceModule;
  description: string;
  debit: number;
  credit: number;
  runningBalance: number;
}

@Component({
  selector: 'app-ledgers-list-widget',
  imports: [
    NewJournalEntryForm,
    EditJournalEntryForm,
    DeleteJournalEntryForm,
  ],
  templateUrl: './ledgers-list-widget.html',
  styleUrl: './ledgers-list-widget.css',
})
export class LedgersListWidget {
  ledgerViewMode = signal<'Statement' | 'TAccount'>('Statement');
  selectedAccountCode = signal<string>('1010');
  showPostLineModal = signal(false);
  editingLineRecord = signal<JournalEntryRecord | null>(null);
  deletingLineRecord = signal<JournalEntryRecord | null>(null);

  accounts = signal<LedgerAccountDefinition[]>([
    { code: '1010', name: 'Bank Operating Account', normalSide: 'Debit', openingBalance: 120000 },
    { code: '1100', name: 'Accounts Receivable (Debtors)', normalSide: 'Debit', openingBalance: 61900 },
    { code: '1210', name: 'Packaging & Bagging Stock', normalSide: 'Debit', openingBalance: 18500 },
    { code: '1220', name: 'Ammonia & Chiller Consumables', normalSide: 'Debit', openingBalance: 12400 },
    { code: '2010', name: 'Accounts Payable (Creditors)', normalSide: 'Credit', openingBalance: 49400 },
    { code: '4000', name: 'Ice Sales Revenue', normalSide: 'Credit', openingBalance: 158000 },
    { code: '5200', name: 'Staff Wages & Overtime', normalSide: 'Debit', openingBalance: 38200 },
  ]);

  rawLines = signal<Record<string, Omit<LedgerMovementLine, 'runningBalance'>[]>>({
    '1010': [
      { id: 'L-101', date: '2026-11-18', ref: 'RCT-2026-014', journal: 'CRJ', sourceModule: 'Sales / Invoices', description: 'Customer receipt settled', debit: 19800, credit: 0 },
      { id: 'L-102', date: '2026-11-19', ref: 'GRN-2026-019', journal: 'CPJ', sourceModule: 'Purchases / GRN', description: 'Packaging supplier EFT payment', debit: 0, credit: 8200 },
    ],
    '1100': [
      { id: 'L-201', date: '2026-11-18', ref: 'INV-2026-042', journal: 'SJ', sourceModule: 'Sales / Invoices', description: 'Hospitality bulk ice invoice', debit: 24500, credit: 0 },
      { id: 'L-202', date: '2026-11-18', ref: 'RCT-2026-014', journal: 'CRJ', sourceModule: 'Sales / Invoices', description: 'Receipt applied to debtor balance', debit: 0, credit: 19800 },
    ],
    '1210': [
      { id: 'L-301', date: '2026-11-19', ref: 'GRN-2026-019', journal: 'CPJ', sourceModule: 'Purchases / GRN', description: 'Ice bags & pallet wrap received', debit: 8200, credit: 0 },
    ],
    '1220': [
      { id: 'L-401', date: '2026-11-19', ref: 'PO-2026-088', journal: 'PJ', sourceModule: 'Purchases / GRN', description: 'Refrigerant & chiller consumables on credit', debit: 14500, credit: 0 },
    ],
    '2010': [
      { id: 'L-501', date: '2026-11-19', ref: 'PO-2026-088', journal: 'PJ', sourceModule: 'Purchases / GRN', description: 'Credit purchase from supplier', debit: 0, credit: 14500 },
    ],
    '4000': [
      { id: 'L-601', date: '2026-11-18', ref: 'INV-2026-042', journal: 'SJ', sourceModule: 'Sales / Invoices', description: 'Ice supply sales revenue', debit: 0, credit: 24500 },
    ],
    '5200': [
      { id: 'L-701', date: '2026-11-17', ref: 'ATT-2026-001', journal: 'GJ', sourceModule: 'Staff & Attendance', description: 'Shift wages & overtime from attendance', debit: 5120, credit: 0 },
    ],
  });

  activeAccount = computed<LedgerAccountDefinition>(() => {
    const code = this.selectedAccountCode();
    return this.accounts().find((a) => a.code === code) || this.accounts()[0];
  });

  computedLines = computed<LedgerMovementLine[]>(() => {
    const acc = this.activeAccount();
    const lines = this.rawLines()[acc.code] || [];
    let balance = acc.openingBalance;

    return lines.map((line) => {
      if (acc.normalSide === 'Debit') {
        balance += line.debit - line.credit;
      } else {
        balance += line.credit - line.debit;
      }
      return {
        ...line,
        runningBalance: balance,
      };
    });
  });

  totalDebit = computed(() =>
    this.computedLines().reduce((s, l) => s + l.debit, 0)
  );

  totalCredit = computed(() =>
    this.computedLines().reduce((s, l) => s + l.credit, 0)
  );

  closingBalance = computed(() => {
    const lines = this.computedLines();
    if (lines.length === 0) return this.activeAccount().openingBalance;
    return lines[lines.length - 1].runningBalance;
  });

  private toJournalRecord(line: LedgerMovementLine): JournalEntryRecord {
    const acc = this.activeAccount();
    return {
      id: line.id,
      entryDate: line.date,
      journal: line.journal,
      sourceModule: line.sourceModule,
      sourceRef: line.ref,
      accountCode: acc.code,
      accountName: acc.name,
      normalSide: acc.normalSide,
      debitAmount: line.debit,
      creditAmount: line.credit,
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      description: line.description,
    };
  }

  openEditLine(line: LedgerMovementLine) {
    this.editingLineRecord.set(this.toJournalRecord(line));
  }

  openDeleteLine(line: LedgerMovementLine) {
    this.deletingLineRecord.set(this.toJournalRecord(line));
  }

  handlePostLedgerLine(entry: Omit<JournalEntryRecord, 'id'>) {
    const code = entry.accountCode || this.activeAccount().code;
    const newLine: Omit<LedgerMovementLine, 'runningBalance'> = {
      id: `L-${Date.now().toString().slice(-4)}`,
      date: entry.entryDate,
      ref: entry.sourceRef || 'ADJ-MANUAL',
      journal: entry.journal,
      sourceModule: entry.sourceModule,
      description: entry.description || 'Manual ledger adjustment',
      debit: entry.debitAmount,
      credit: entry.creditAmount,
    };

    this.rawLines.update((map) => ({
      ...map,
      [code]: [...(map[code] || []), newLine],
    }));
    this.selectedAccountCode.set(code);
    this.showPostLineModal.set(false);
  }

  handleUpdateLedgerLine(updated: JournalEntryRecord) {
    const code = this.activeAccount().code;
    this.rawLines.update((map) => ({
      ...map,
      [code]: (map[code] || []).map((item) =>
        item.id === updated.id
          ? {
              ...item,
              date: updated.entryDate,
              journal: updated.journal,
              sourceModule: updated.sourceModule,
              ref: updated.sourceRef,
              description: updated.description,
              debit: updated.debitAmount,
              credit: updated.creditAmount,
            }
          : item
      ),
    }));
    this.editingLineRecord.set(null);
  }

  handleDeleteLedgerLine(id: string) {
    const code = this.activeAccount().code;
    this.rawLines.update((map) => ({
      ...map,
      [code]: (map[code] || []).filter((item) => item.id !== id),
    }));
    this.deletingLineRecord.set(null);
  }

  formatZar(amount: number): string {
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    return `${sign}R ${abs.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}