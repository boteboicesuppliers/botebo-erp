import { Component, computed, signal } from '@angular/core';
import { NewInvoiceForm } from '../new-invoice-form/new-invoice-form';
import { EditInvoiceForm } from '../edit-invoice-form/edit-invoice-form';
import { RecordPaymentForm } from '../record-payment-form/record-payment-form';

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Partially Paid' | 'Overdue';

export interface InvoiceRecord {
  id: string;
  orderId: string;
  customerCode: string;
  client: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  balanceDue: number;
  status: InvoiceStatus;
}

@Component({
  selector: 'app-invoice-list-widget',
  imports: [NewInvoiceForm, EditInvoiceForm, RecordPaymentForm],
  templateUrl: './invoice-list-widget.html',
  styleUrl: './invoice-list-widget.css',
})
export class InvoiceListWidget {
  searchQuery = signal('');
  selectedStatus = signal<string>('All');
  selectedInvoiceId = signal<string | null>(null);

  // Pagination State
  currentPage = signal(1);
  pageSize = 5;

  // Modals
  showNewModal = signal(false);
  editingInvoice = signal<InvoiceRecord | null>(null);
  payingInvoice = signal<InvoiceRecord | null>(null);

  invoices = signal<InvoiceRecord[]>([
    {
      id: 'INV-2026-0411',
      orderId: 'SO-2026-0912',
      customerCode: 'C-RES-0014',
      client: 'Botebo Ice Distributors',
      issueDate: '2026-10-15',
      dueDate: '2026-11-15',
      totalAmount: 145200,
      balanceDue: 145200,
      status: 'Overdue',
    },
    {
      id: 'INV-2026-0412',
      orderId: 'SO-2026-0913',
      customerCode: 'C-RET-0029',
      client: 'Gauteng Forecourt Holdings',
      issueDate: '2026-10-20',
      dueDate: '2026-11-20',
      totalAmount: 89000,
      balanceDue: 89000,
      status: 'Unpaid',
    },
    {
      id: 'INV-2026-0413',
      orderId: 'SO-2026-0914',
      customerCode: 'C-FB-0008',
      client: 'Pretoria Hospitality Group',
      issueDate: '2026-10-25',
      dueDate: '2026-11-25',
      totalAmount: 230400,
      balanceDue: 0,
      status: 'Paid',
    },
    {
      id: 'INV-2026-0414',
      orderId: 'SO-2026-0915',
      customerCode: 'C-RES-0041',
      client: 'Centurion Cold Chain',
      issueDate: '2026-11-01',
      dueDate: '2026-12-01',
      totalAmount: 312000,
      balanceDue: 150000,
      status: 'Partially Paid',
    },
    {
      id: 'INV-2026-0415',
      orderId: 'SO-2026-0916',
      customerCode: 'C-RET-0012',
      client: 'Midrand Express Marts',
      issueDate: '2026-11-05',
      dueDate: '2026-12-05',
      totalAmount: 54000,
      balanceDue: 54000,
      status: 'Unpaid',
    },
    {
      id: 'INV-2026-0416',
      orderId: 'SO-2026-0918',
      customerCode: 'C-RES-0088',
      client: 'Vaal River Beverages',
      issueDate: '2026-09-10',
      dueDate: '2026-10-10',
      totalAmount: 410000,
      balanceDue: 410000,
      status: 'Overdue',
    },
    {
      id: 'INV-2026-0417',
      orderId: 'SO-2026-0919',
      customerCode: 'C-RET-0054',
      client: 'Soweto Retail Express',
      issueDate: '2026-11-10',
      dueDate: '2026-12-10',
      totalAmount: 195000,
      balanceDue: 0,
      status: 'Paid',
    },
  ]);

  filteredInvoices = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.invoices().filter((inv) => {
      const matchesSearch =
        inv.id.toLowerCase().includes(q) ||
        inv.client.toLowerCase().includes(q) ||
        inv.customerCode.toLowerCase().includes(q) ||
        inv.orderId.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || inv.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredInvoices().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredInvoices().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredInvoices().length));

  paginatedInvoices = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredInvoices().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  getStatusBadgeClass(status: InvoiceStatus): string {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-900';
      case 'Partially Paid':
      case 'Unpaid':
        return 'bg-sky-100 text-sky-900';
      case 'Overdue':
        return 'bg-red-100 text-red-900';
    }
  }

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  handleCreateInvoice(newInv: Omit<InvoiceRecord, 'id'>) {
    const nextNum = 418 + this.invoices().length;
    const created: InvoiceRecord = {
      ...newInv,
      id: `INV-2026-0${nextNum}`,
    };
    this.invoices.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateInvoice(updated: InvoiceRecord) {
    this.invoices.update((list) => list.map((item) => (item.id === updated.id ? updated : item)));
    this.editingInvoice.set(null);
  }

  handleRecordPayment(payment: { invoiceId: string; amountPaid: number }) {
    this.invoices.update((list) =>
      list.map((inv) => {
        if (inv.id === payment.invoiceId) {
          const newBalance = Math.max(0, inv.balanceDue - payment.amountPaid);
          const newStatus: InvoiceStatus = newBalance === 0 ? 'Paid' : 'Partially Paid';
          return { ...inv, balanceDue: newBalance, status: newStatus };
        }
        return inv;
      })
    );
    this.payingInvoice.set(null);
  }
}