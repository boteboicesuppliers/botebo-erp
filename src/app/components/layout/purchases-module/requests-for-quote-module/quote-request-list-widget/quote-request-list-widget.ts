import { Component, computed, signal } from '@angular/core';
import { NewRequestForQuoteForm } from '../new-request-for-quote-form/new-request-for-quote-form';
import { EditRequestForQuoteForm } from '../edit-request-for-quote-form/edit-request-for-quote-form';
import { DeleteRequestForQuoteForm } from '../delete-request-for-quote-form/delete-request-for-quote-form';

export type RfqStatus = 'Active' | 'Evaluating' | 'Awarded' | 'Closed';

export interface RfqRecord {
  id: string;
  supplier: string;
  item: string;
  deadline: string;
  quotesReceived: string;
  status: RfqStatus;
}

@Component({
  selector: 'app-quote-request-list-widget',
  imports: [
    NewRequestForQuoteForm,
    EditRequestForQuoteForm,
    DeleteRequestForQuoteForm,
  ],
  templateUrl: './quote-request-list-widget.html',
  styleUrl: './quote-request-list-widget.css',
})
export class QuoteRequestListWidget {
  showNewModal = signal(false);
  editingRfq = signal<RfqRecord | null>(null);
  deletingRfq = signal<RfqRecord | null>(null);

  searchQuery = signal('');
  selectedStatus = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  rfqs = signal<RfqRecord[]>([
    {
      id: 'RFQ-2026-0041',
      supplier: 'Gauteng Chemical Supplies',
      item: 'Ammonia Refrigerant (500kg)',
      deadline: '2026-11-22',
      quotesReceived: '2 of 3',
      status: 'Active',
    },
    {
      id: 'RFQ-2026-0042',
      supplier: 'Mpumalanga Packaging Corp',
      item: 'LDPE Film Rolls (2,000)',
      deadline: '2026-11-24',
      quotesReceived: '3 of 3',
      status: 'Evaluating',
    },
    {
      id: 'RFQ-2026-0043',
      supplier: 'Pretoria Industrial Pumps & Valves',
      item: 'Stainless Steel Filtration Cartridges (12 units)',
      deadline: '2026-11-18',
      quotesReceived: '3 of 3',
      status: 'Awarded',
    },
  ]);

  filteredRfqs = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.rfqs().filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(q) ||
        item.supplier.toLowerCase().includes(q) ||
        item.item.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || item.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredRfqs().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredRfqs().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredRfqs().length));

  paginatedRfqs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredRfqs().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  handleCreateRfq(data: Omit<RfqRecord, 'id'>) {
    const nextNum = 44 + this.rfqs().length;
    const created: RfqRecord = {
      id: `RFQ-2026-00${nextNum}`,
      ...data,
    };
    this.rfqs.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateRfq(updated: RfqRecord) {
    this.rfqs.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingRfq.set(null);
  }

  handleDeleteRfq(id: string) {
    this.rfqs.update((list) => list.filter((item) => item.id !== id));
    this.deletingRfq.set(null);
  }

  getStatusBadgeClass(status: RfqStatus): string {
    switch (status) {
      case 'Awarded':
        return 'bg-emerald-100 text-emerald-900';
      case 'Active':
        return 'bg-sky-100 text-sky-900';
      case 'Evaluating':
        return 'bg-amber-100 text-amber-900';
      case 'Closed':
        return 'bg-slate-200 text-slate-800';
    }
  }
}