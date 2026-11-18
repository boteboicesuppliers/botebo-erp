import { Component, computed, signal } from '@angular/core';
import { NewRequisitionForm } from '../new-requisition-form/new-requisition-form';
import { EditRequisitionForm } from '../edit-requisition-form/edit-requisition-form';

export interface PurchaseRequisitionRecord {
  id: string;
  item: string;
  qty: string;
  department: string;
  requestedBy: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-purchase-request-list-widget',
  imports: [NewRequisitionForm, EditRequisitionForm],
  templateUrl: './purchase-request-list-widget.html',
  styleUrl: './purchase-request-list-widget.css',
})
export class PurchaseRequestListWidget {
  showNewModal = signal(false);
  editingRequisition = signal<PurchaseRequisitionRecord | null>(null);

  searchQuery = signal('');
  selectedStatus = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  requests = signal<PurchaseRequisitionRecord[]>([
    {
      id: 'PR-2026-0101',
      item: 'Food-Grade Ammonia Refrigerant',
      qty: '500 kg',
      department: 'Production Line A',
      requestedBy: 'S. Khumalo',
      status: 'Approved',
      date: '2026-11-16',
    },
    {
      id: 'PR-2026-0102',
      item: 'Heavy-Duty LDPE Packaging Film',
      qty: '2,000 rolls',
      department: 'Packaging Plant',
      requestedBy: 'J. Mthethwa',
      status: 'Pending Approval',
      date: '2026-11-17',
    },
    {
      id: 'PR-2026-0103',
      item: 'Stainless Steel Water Filtration Filters',
      qty: '12 units',
      department: 'Maintenance',
      requestedBy: 'P. van der Merwe',
      status: 'Approved',
      date: '2026-11-15',
    },
  ]);

  filteredRequests = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.requests().filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(q) ||
        item.item.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.requestedBy.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || item.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredRequests().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredRequests().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredRequests().length));

  paginatedRequests = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredRequests().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-900';
      case 'Rejected':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-amber-100 text-amber-900';
    }
  }

  handleCreateRequisition(data: Omit<PurchaseRequisitionRecord, 'id'>) {
    const nextNum = 104 + this.requests().length;
    const created: PurchaseRequisitionRecord = {
      id: `PR-2026-0${nextNum}`,
      ...data,
    };
    this.requests.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateRequisition(updated: PurchaseRequisitionRecord) {
    this.requests.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingRequisition.set(null);
  }
}