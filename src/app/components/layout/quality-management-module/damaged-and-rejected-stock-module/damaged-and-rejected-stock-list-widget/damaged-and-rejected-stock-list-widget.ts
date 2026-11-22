import { Component, computed, signal } from '@angular/core';
import { NewDamagedRejectedStockForm } from '../new-damaged-rejected-stock-form/new-damaged-rejected-stock-form';
import { EditDamagedRejectedStockForm } from '../edit-damaged-rejected-stock-form/edit-damaged-rejected-stock-form';
import { DeleteDamagedRejectedStockForm } from '../delete-damaged-rejected-stock-form/delete-damaged-rejected-stock-form';

export type RejectedItemKind = 'Finished Good' | 'Raw Material' | 'Packaging';
export type DispositionAction = 'Scrap / Melt' | 'Return to Supplier' | 'Rework / Repack' | 'Quarantine Hold';

export interface DamagedRejectedStockRecord {
  id: string;
  referenceCode: string;
  itemName: string;
  itemKind: RejectedItemKind;
  batchOrLot: string;
  quantity: number;
  unitOfMeasure: string;
  reason: string;
  disposition: DispositionAction;
  loggedDate: string;
  loggedBy: string;
}

@Component({
  selector: 'app-damaged-and-rejected-stock-list-widget',
  imports: [
    NewDamagedRejectedStockForm,
    EditDamagedRejectedStockForm,
    DeleteDamagedRejectedStockForm,
  ],
  templateUrl: './damaged-and-rejected-stock-list-widget.html',
  styleUrl: './damaged-and-rejected-stock-list-widget.css',
})
export class DamagedAndRejectedStockListWidget {
  kindFilter = signal<'All' | RejectedItemKind>('All');
  dispositionFilter = signal<'All' | DispositionAction>('All');
  searchQuery = signal('');

  showNewModal = signal(false);
  editingRecord = signal<DamagedRejectedStockRecord | null>(null);
  deletingRecord = signal<DamagedRejectedStockRecord | null>(null);

  records = signal<DamagedRejectedStockRecord[]>([
    {
      id: 'DR-1',
      referenceCode: 'REJ-2026-014',
      itemName: '2kg Party Cube Ice Bag',
      itemKind: 'Finished Good',
      batchOrLot: 'BCH-ICE-1120A',
      quantity: 48,
      unitOfMeasure: 'Bags',
      reason: 'Torn poly bags & partial thaw during cold-room transfer',
      disposition: 'Scrap / Melt',
      loggedDate: '2026-11-20',
      loggedBy: 'T. Dlamini',
    },
    {
      id: 'DR-2',
      referenceCode: 'REJ-2026-015',
      itemName: 'Food-Grade 2kg Ice Poly Bag Roll',
      itemKind: 'Packaging',
      batchOrLot: 'LOT-PKG-882',
      quantity: 3,
      unitOfMeasure: 'Rolls',
      reason: 'Heat-seal weld failure along roll edge',
      disposition: 'Return to Supplier',
      loggedDate: '2026-11-19',
      loggedBy: 'K. Mahlangu',
    },
    {
      id: 'DR-3',
      referenceCode: 'REJ-2026-016',
      itemName: '10kg Block Ice',
      itemKind: 'Finished Good',
      batchOrLot: 'BCH-BLK-1118C',
      quantity: 14,
      unitOfMeasure: 'Blocks',
      reason: 'Chipped corners from blast freezer unloading',
      disposition: 'Quarantine Hold',
      loggedDate: '2026-11-18',
      loggedBy: 'P. Sithole',
    },
  ]);

  filteredRecords = computed(() => {
    const kind = this.kindFilter();
    const disp = this.dispositionFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.records().filter((rec) => {
      const matchesKind = kind === 'All' || rec.itemKind === kind;
      const matchesDisp = disp === 'All' || rec.disposition === disp;
      const matchesQuery =
        !q ||
        rec.referenceCode.toLowerCase().includes(q) ||
        rec.itemName.toLowerCase().includes(q) ||
        rec.batchOrLot.toLowerCase().includes(q) ||
        rec.reason.toLowerCase().includes(q) ||
        rec.loggedBy.toLowerCase().includes(q);
      return matchesKind && matchesDisp && matchesQuery;
    });
  });

  totalUnits = computed(() =>
    this.filteredRecords().reduce((sum, r) => sum + r.quantity, 0)
  );

  addRecord(payload: Omit<DamagedRejectedStockRecord, 'id'>): void {
    const nextId = `DR-${Date.now()}`;
    this.records.update((list) => [{ id: nextId, ...payload }, ...list]);
    this.showNewModal.set(false);
  }

  updateRecord(updated: DamagedRejectedStockRecord): void {
    this.records.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingRecord.set(null);
  }

  deleteRecord(id: string): void {
    this.records.update((list) => list.filter((item) => item.id !== id));
    this.deletingRecord.set(null);
  }
}