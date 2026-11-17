import { Component, computed, signal } from '@angular/core';

export type ProductionStatus = 'Planned' | 'In Production' | 'Quality QA' | 'Completed' | 'Cancelled';

export interface ProductionOrderRecord {
  id: string;
  orderNumber: string;
  product: string;
  quantity: string;
  startDate: string;
  completionDate: string;
  status: ProductionStatus;
  warehouse: string;
}

@Component({
  selector: 'app-production-orders-and-batches',
  imports: [],
  templateUrl: './production-orders-and-batches.html',
  styleUrl: './production-orders-and-batches.css',
})
export class ProductionOrdersAndBatches {
  searchQuery = signal('');
  selectedStatus = signal<string>('All');

  // Pagination State
  currentPage = signal(1);
  pageSize = 5;

  orders = signal<ProductionOrderRecord[]>([
    {
      id: 'PO-2026-0301',
      orderNumber: 'BATCH-8801',
      product: '10kg Commercial Ice Blocks',
      quantity: '2,500 units',
      startDate: '2026-11-15',
      completionDate: '2026-11-16',
      status: 'Completed',
      warehouse: 'Johannesburg Cold Store',
    },
    {
      id: 'PO-2026-0302',
      orderNumber: 'BATCH-8802',
      product: '5kg Party Ice Bags',
      quantity: '6,000 units',
      startDate: '2026-11-16',
      completionDate: '2026-11-17',
      status: 'In Production',
      warehouse: 'Midrand Depot',
    },
    {
      id: 'PO-2026-0303',
      orderNumber: 'BATCH-8803',
      product: 'Crushed Ice 25kg Bulk',
      quantity: '800 units',
      startDate: '2026-11-16',
      completionDate: '2026-11-18',
      status: 'Quality QA',
      warehouse: 'Centurion Hub',
    },
    {
      id: 'PO-2026-0304',
      orderNumber: 'BATCH-8804',
      product: '10kg Commercial Ice Blocks',
      quantity: '1,800 units',
      startDate: '2026-11-18',
      completionDate: '2026-11-19',
      status: 'Planned',
      warehouse: 'Pretoria Central',
    },
    {
      id: 'PO-2026-0305',
      orderNumber: 'BATCH-8805',
      product: '5kg Party Ice Bags',
      quantity: '4,500 units',
      startDate: '2026-11-14',
      completionDate: '2026-11-15',
      status: 'Completed',
      warehouse: 'Midrand Depot',
    },
  ]);

  filteredOrders = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.orders().filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(q) ||
        item.orderNumber.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.warehouse.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || item.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredOrders().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredOrders().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredOrders().length));

  paginatedOrders = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredOrders().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  getStatusBadgeClass(status: ProductionStatus): string {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-900';
      case 'In Production':
        return 'bg-sky-100 text-sky-900';
      case 'Quality QA':
        return 'bg-amber-100 text-amber-900';
      case 'Planned':
        return 'bg-[#e1e6ed] text-[#374151]';
      case 'Cancelled':
        return 'bg-red-100 text-red-900';
    }
  }
}