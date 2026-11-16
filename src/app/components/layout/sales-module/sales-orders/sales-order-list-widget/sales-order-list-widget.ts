import { Component, computed, signal } from '@angular/core';
import { NewSalesOrderForm } from '../new-sales-order-form/new-sales-order-form';
import { EditSalesOrderForm } from '../edit-sales-order-form/edit-sales-order-form';
import { DeleteSalesOrderForm } from '../delete-sales-order-form/delete-sales-order-form';

export type OrderStatus = 'Draft' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Fulfilled' | 'Cancelled';

export interface SalesOrderRecord {
  id: string;
  customerCode: string;
  client: string;
  tier: string;
  orderDate: string;
  deliveryDate: string;
  value: number;
  status: OrderStatus;
  isUrgent: boolean;
  warehouse: string;
}

@Component({
  selector: 'app-sales-order-list-widget',
  imports: [NewSalesOrderForm, EditSalesOrderForm, DeleteSalesOrderForm],
  templateUrl: './sales-order-list-widget.html',
  styleUrl: './sales-order-list-widget.css',
})
export class SalesOrderListWidget {
  searchQuery = signal('');
  selectedStatus = signal<string>('All');
  selectedTier = signal<string>('All');
  selectedOrderId = signal<string | null>(null);

  // Pagination State
  currentPage = signal(1);
  pageSize = 5;

  // Modals
  showNewModal = signal(false);
  editingOrder = signal<SalesOrderRecord | null>(null);
  deletingOrder = signal<SalesOrderRecord | null>(null);

  orders = signal<SalesOrderRecord[]>([
    {
      id: 'SO-2026-0912',
      customerCode: 'C-RES-0014',
      client: 'Botebo Ice Distributors',
      tier: 'Tier 1 · Bulk Wholesale',
      orderDate: '2026-11-16',
      deliveryDate: '2026-11-18',
      value: 145200,
      status: 'Processing',
      isUrgent: true,
      warehouse: 'Johannesburg Cold Store',
    },
    {
      id: 'SO-2026-0913',
      customerCode: 'C-RET-0029',
      client: 'Gauteng Forecourt Holdings',
      tier: 'Tier 2 · Contract',
      orderDate: '2026-11-15',
      deliveryDate: '2026-11-17',
      value: 89000,
      status: 'Confirmed',
      isUrgent: false,
      warehouse: 'Midrand Depot',
    },
    {
      id: 'SO-2026-0914',
      customerCode: 'C-FB-0008',
      client: 'Pretoria Hospitality Group',
      tier: 'Tier 3 · Standard',
      orderDate: '2026-11-14',
      deliveryDate: '2026-11-16',
      value: 230400,
      status: 'Fulfilled',
      isUrgent: false,
      warehouse: 'Pretoria Central',
    },
    {
      id: 'SO-2026-0915',
      customerCode: 'C-RES-0041',
      client: 'Centurion Cold Chain',
      tier: 'Tier 1 · Bulk Wholesale',
      orderDate: '2026-11-13',
      deliveryDate: '2026-11-15',
      value: 312000,
      status: 'Dispatched',
      isUrgent: false,
      warehouse: 'Centurion Hub',
    },
    {
      id: 'SO-2026-0916',
      customerCode: 'C-RET-0012',
      client: 'Midrand Express Marts',
      tier: 'Tier 2 · Contract',
      orderDate: '2026-11-12',
      deliveryDate: '2026-11-14',
      value: 54000,
      status: 'Fulfilled',
      isUrgent: false,
      warehouse: 'Midrand Depot',
    },
    {
      id: 'SO-2026-0917',
      customerCode: 'C-FB-0019',
      client: 'Sandton Events & Catering',
      tier: 'Tier 3 · Standard',
      orderDate: '2026-11-11',
      deliveryDate: '2026-11-13',
      value: 94500,
      status: 'Draft',
      isUrgent: false,
      warehouse: 'Johannesburg Cold Store',
    },
    {
      id: 'SO-2026-0918',
      customerCode: 'C-RES-0088',
      client: 'Vaal River Beverages',
      tier: 'Tier 1 · Bulk Wholesale',
      orderDate: '2026-11-10',
      deliveryDate: '2026-11-12',
      value: 410000,
      status: 'Processing',
      isUrgent: true,
      warehouse: 'Johannesburg Cold Store',
    },
  ]);

  filteredOrders = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    const tier = this.selectedTier();

    return this.orders().filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.customerCode.toLowerCase().includes(q) ||
        item.warehouse.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || item.status === status;
      const matchesTier = tier === 'All' || item.tier === tier;
      return matchesSearch && matchesStatus && matchesTier;
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

  getStatusBadgeClass(status: OrderStatus): string {
    switch (status) {
      case 'Fulfilled':
      case 'Dispatched':
        return 'bg-emerald-100 text-emerald-900';
      case 'Processing':
      case 'Confirmed':
        return 'bg-sky-100 text-sky-900';
      case 'Draft':
        return 'bg-amber-100 text-amber-900';
      case 'Cancelled':
        return 'bg-red-100 text-red-900';
    }
  }

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  handleCreateOrder(newOrder: Omit<SalesOrderRecord, 'id'>) {
    const nextNum = 919 + this.orders().length;
    const created: SalesOrderRecord = {
      ...newOrder,
      id: `SO-2026-0${nextNum}`,
    };
    this.orders.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateOrder(updated: SalesOrderRecord) {
    this.orders.update((list) => list.map((item) => (item.id === updated.id ? updated : item)));
    this.editingOrder.set(null);
  }

  handleDeleteOrder(id: string) {
    this.orders.update((list) => list.filter((item) => item.id !== id));
    this.deletingOrder.set(null);
  }
}