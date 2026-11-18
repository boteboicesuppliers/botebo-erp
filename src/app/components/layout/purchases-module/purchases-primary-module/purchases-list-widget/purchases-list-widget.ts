import { Component, computed, signal } from '@angular/core';
import { NewPurchaseEntryForm } from '../new-purchase-entry-form/new-purchase-entry-form';
import { EditPurchaseEntryForm } from '../edit-purchase-entry-form/edit-purchase-entry-form';
import { DeletePurchaseEntryForm } from '../delete-purchase-entry-form/delete-purchase-entry-form';

export type PurchaseOrderStatus = 'Pending Approval' | 'Confirmed' | 'In Transit' | 'Received' | 'Cancelled';

export interface PurchaseEntryRecord {
  id: string;
  supplier: string;
  description: string;
  category: string;
  orderDate: string;
  expectedDelivery: string;
  totalAmount: number;
  status: PurchaseOrderStatus;
}

@Component({
  selector: 'app-purchases-list-widget',
  imports: [
    NewPurchaseEntryForm,
    EditPurchaseEntryForm,
    DeletePurchaseEntryForm,
  ],
  templateUrl: './purchases-list-widget.html',
  styleUrl: './purchases-list-widget.css',
})
export class PurchasesListWidget {
  showNewModal = signal(false);
  editingEntry = signal<PurchaseEntryRecord | null>(null);
  deletingEntry = signal<PurchaseEntryRecord | null>(null);

  searchQuery = signal('');
  selectedStatus = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  entries = signal<PurchaseEntryRecord[]>([
    {
      id: 'PO-2026-0410',
      supplier: 'Gauteng Chemical Supplies',
      description: 'Food-Grade Ammonia Refrigerant (500 kg)',
      category: 'Raw Materials',
      orderDate: '2026-11-14',
      expectedDelivery: '2026-11-18',
      totalAmount: 42500.00,
      status: 'Confirmed',
    },
    {
      id: 'PO-2026-0411',
      supplier: 'Mpumalanga Packaging Corp',
      description: 'Heavy-Duty LDPE Ice Bags 5kg (10,000 units)',
      category: 'Packaging',
      orderDate: '2026-11-15',
      expectedDelivery: '2026-11-20',
      totalAmount: 18400.00,
      status: 'In Transit',
    },
    {
      id: 'PO-2026-0412',
      supplier: 'Pretoria Industrial Pumps & Valves',
      description: 'Stainless Steel Filtration Cartridges (12 units)',
      category: 'Maintenance & Spares',
      orderDate: '2026-11-16',
      expectedDelivery: '2026-11-19',
      totalAmount: 9650.00,
      status: 'Pending Approval',
    },
    {
      id: 'PO-2026-0413',
      supplier: 'Highveld Fleet & Diesel Services',
      description: 'Bulk Refrigeration Truck Diesel Allocation',
      category: 'Logistics & Fuel',
      orderDate: '2026-11-12',
      expectedDelivery: '2026-11-12',
      totalAmount: 31200.00,
      status: 'Received',
    },
  ]);

  filteredEntries = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.entries().filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(q) ||
        item.supplier.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || item.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredEntries().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredEntries().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredEntries().length));

  paginatedEntries = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredEntries().slice(start, start + this.pageSize);
  });

  totalSpend = computed(() =>
    this.entries()
      .filter((e) => e.status !== 'Cancelled')
      .reduce((sum, e) => sum + e.totalAmount, 0)
  );

  openOrdersCount = computed(() =>
    this.entries().filter((e) => e.status === 'Pending Approval' || e.status === 'Confirmed' || e.status === 'In Transit').length
  );

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  handleCreateEntry(data: Omit<PurchaseEntryRecord, 'id'>) {
    const nextNum = 414 + this.entries().length;
    const created: PurchaseEntryRecord = {
      id: `PO-2026-0${nextNum}`,
      ...data,
    };
    this.entries.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateEntry(updated: PurchaseEntryRecord) {
    this.entries.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingEntry.set(null);
  }

  handleDeleteEntry(id: string) {
    this.entries.update((list) => list.filter((item) => item.id !== id));
    this.deletingEntry.set(null);
  }

  formatCurrency(amount: number): string {
    return 'R ' + amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getStatusBadgeClass(status: PurchaseOrderStatus): string {
    switch (status) {
      case 'Received':
        return 'bg-emerald-100 text-emerald-900';
      case 'Confirmed':
      case 'In Transit':
        return 'bg-sky-100 text-sky-900';
      case 'Pending Approval':
        return 'bg-amber-100 text-amber-900';
      case 'Cancelled':
        return 'bg-red-100 text-red-900';
    }
  }
}