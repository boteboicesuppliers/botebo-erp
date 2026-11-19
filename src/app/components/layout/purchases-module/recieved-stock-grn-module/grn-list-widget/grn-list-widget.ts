import { Component, computed, signal } from '@angular/core';
import { NewGrnEntryForm } from '../new-grn-entry-form/new-grn-entry-form';
import { EditGrnEntryForm } from '../edit-grn-entry-form/edit-grn-entry-form';
import { DeleteGrnEntryForm } from '../delete-grn-entry-form/delete-grn-entry-form';

export type GrnQaStatus = 'Passed' | 'Quarantined' | 'Rejected';

export interface GrnEntryRecord {
  id: string;
  poRef: string;
  supplier: string;
  receivedDate: string;
  itemsChecked: string;
  warehouse: string;
  qaStatus: GrnQaStatus;
}

@Component({
  selector: 'app-grn-list-widget',
  imports: [
    NewGrnEntryForm,
    EditGrnEntryForm,
    DeleteGrnEntryForm,
  ],
  templateUrl: './grn-list-widget.html',
  styleUrl: './grn-list-widget.css',
})
export class GrnListWidget {
  showNewModal = signal(false);
  editingGrn = signal<GrnEntryRecord | null>(null);
  deletingGrn = signal<GrnEntryRecord | null>(null);

  searchQuery = signal('');
  selectedQaStatus = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  grns = signal<GrnEntryRecord[]>([
    {
      id: 'GRN-2026-0891',
      poRef: 'PO-2026-0410',
      supplier: 'Gauteng Chemical Supplies',
      receivedDate: '2026-11-18',
      itemsChecked: '500 kg Food-Grade Ammonia Refrigerant',
      warehouse: 'Pretoria Cold Storage Hub',
      qaStatus: 'Passed',
    },
    {
      id: 'GRN-2026-0892',
      poRef: 'PO-2026-0411',
      supplier: 'Mpumalanga Packaging Corp',
      receivedDate: '2026-11-18',
      itemsChecked: '10,000 Heavy-Duty LDPE Ice Bags (5kg)',
      warehouse: 'Johannesburg Packaging Depot',
      qaStatus: 'Passed',
    },
    {
      id: 'GRN-2026-0893',
      poRef: 'PO-2026-0412',
      supplier: 'Pretoria Industrial Pumps & Valves',
      receivedDate: '2026-11-19',
      itemsChecked: '12 Stainless Steel Filtration Cartridges',
      warehouse: 'Centurion Plant Vault',
      qaStatus: 'Quarantined',
    },
  ]);

  filteredGrns = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const qa = this.selectedQaStatus();

    return this.grns().filter((entry) => {
      const matchesSearch =
        entry.id.toLowerCase().includes(q) ||
        entry.poRef.toLowerCase().includes(q) ||
        entry.supplier.toLowerCase().includes(q) ||
        entry.itemsChecked.toLowerCase().includes(q) ||
        entry.warehouse.toLowerCase().includes(q);
      const matchesQa = qa === 'All' || entry.qaStatus === qa;
      return matchesSearch && matchesQa;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredGrns().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredGrns().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredGrns().length));

  paginatedGrns = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredGrns().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  handleCreateGrn(data: Omit<GrnEntryRecord, 'id'>) {
    const nextNum = 894 + this.grns().length;
    const created: GrnEntryRecord = {
      id: `GRN-2026-0${nextNum}`,
      ...data,
    };
    this.grns.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateGrn(updated: GrnEntryRecord) {
    this.grns.update((list) =>
      list.map((entry) => (entry.id === updated.id ? updated : entry))
    );
    this.editingGrn.set(null);
  }

  handleDeleteGrn(id: string) {
    this.grns.update((list) => list.filter((entry) => entry.id !== id));
    this.deletingGrn.set(null);
  }

  getQaBadgeClass(status: GrnQaStatus): string {
    switch (status) {
      case 'Passed':
        return 'bg-emerald-100 text-emerald-900';
      case 'Quarantined':
        return 'bg-amber-100 text-amber-900';
      case 'Rejected':
        return 'bg-red-100 text-red-900';
    }
  }
}