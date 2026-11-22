import { Component, computed, signal } from '@angular/core';
import {
  CreditLimitUpdatePayload,
  UpdateCreditLimitForm,
} from '../update-credit-limit-form/update-credit-limit-form';

export interface CustomerCreditBalanceRow {
  id: string;
  customerCode: string;
  customerName: string;
  paymentTerms: string;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  status: 'Healthy' | 'Near Limit' | 'Over Limit';
}

@Component({
  selector: 'app-credit-balance-list-widget',
  imports: [UpdateCreditLimitForm],
  templateUrl: './credit-balance-list-widget.html',
  styleUrl: './credit-balance-list-widget.css',
})
export class CreditBalanceListWidget {
  searchQuery = signal('');
  statusFilter = signal<'All' | CustomerCreditBalanceRow['status']>('All');
  selectedCustomer = signal<CustomerCreditBalanceRow | null>(null);
  lastUpdateNotice = signal<string>('');

  customers = signal<CustomerCreditBalanceRow[]>([
    {
      id: 'CB-1',
      customerCode: 'CUST-001',
      customerName: 'Highveld Cold Chain',
      paymentTerms: '30 Days',
      creditLimit: 120000,
      currentBalance: 42150,
      availableCredit: 77850,
      status: 'Healthy',
    },
    {
      id: 'CB-2',
      customerCode: 'CUST-002',
      customerName: 'Mamelodi SuperSpar',
      paymentTerms: '14 Days',
      creditLimit: 60000,
      currentBalance: 49800,
      availableCredit: 10200,
      status: 'Near Limit',
    },
    {
      id: 'CB-3',
      customerCode: 'CUST-003',
      customerName: 'Suncrest Hospitality Group',
      paymentTerms: '30 Days',
      creditLimit: 85000,
      currentBalance: 91200,
      availableCredit: -6200,
      status: 'Over Limit',
    },
    {
      id: 'CB-4',
      customerCode: 'CUST-004',
      customerName: 'AquaCold Events & Catering',
      paymentTerms: 'COD / 7 Days',
      creditLimit: 35000,
      currentBalance: 16450,
      availableCredit: 18550,
      status: 'Healthy',
    },
    {
      id: 'CB-5',
      customerCode: 'CUST-005',
      customerName: 'Metro Forecourt & Convenience',
      paymentTerms: '30 Days',
      creditLimit: 90000,
      currentBalance: 78500,
      availableCredit: 11500,
      status: 'Near Limit',
    },
  ]);

  filteredCustomers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const st = this.statusFilter();

    return this.customers().filter((row) => {
      const matchesStatus = st === 'All' || row.status === st;
      const matchesQuery =
        !q ||
        row.customerCode.toLowerCase().includes(q) ||
        row.customerName.toLowerCase().includes(q) ||
        row.paymentTerms.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  });

  totalCreditLimit = computed(() =>
    this.filteredCustomers().reduce((sum, r) => sum + r.creditLimit, 0)
  );

  totalCurrentBalance = computed(() =>
    this.filteredCustomers().reduce((sum, r) => sum + r.currentBalance, 0)
  );

  totalAvailableCredit = computed(() =>
    this.filteredCustomers().reduce((sum, r) => sum + r.availableCredit, 0)
  );

  openUpdateLimit(row: CustomerCreditBalanceRow): void {
    this.selectedCustomer.set(row);
  }

  closeUpdateLimit(): void {
    this.selectedCustomer.set(null);
  }

  applyCreditLimitUpdate(payload: CreditLimitUpdatePayload): void {
    let updatedName = '';

    this.customers.update((rows) =>
      rows.map((row) => {
        if (row.id !== payload.customerId) return row;
        updatedName = row.customerName;
        const availableCredit = payload.newCreditLimit - row.currentBalance;
        return {
          ...row,
          creditLimit: payload.newCreditLimit,
          availableCredit,
          status: this.computeStatus(payload.newCreditLimit, row.currentBalance),
        };
      })
    );

    if (updatedName) {
      this.lastUpdateNotice.set(
        `Updated credit limit for ${updatedName} to ${this.formatRand(payload.newCreditLimit)} (${payload.reason}).`
      );
    }

    this.selectedCustomer.set(null);
  }

  private computeStatus(
    creditLimit: number,
    currentBalance: number
  ): CustomerCreditBalanceRow['status'] {
    if (currentBalance > creditLimit) return 'Over Limit';
    if (creditLimit > 0 && currentBalance / creditLimit >= 0.75) return 'Near Limit';
    return 'Healthy';
  }

  formatRand(amount: number): string {
    const prefix = amount < 0 ? '-R ' : 'R ';
    return `${prefix}${Math.abs(amount).toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  utilizationPercent(row: CustomerCreditBalanceRow): number {
    if (row.creditLimit <= 0) return row.currentBalance > 0 ? 100 : 0;
    return Math.min(100, Math.round((row.currentBalance / row.creditLimit) * 100));
  }

  statusBadgeClass(status: CustomerCreditBalanceRow['status']): string {
    switch (status) {
      case 'Healthy':
        return 'border border-[#bbf7d0] bg-[#dcfce7] text-[#15803d]';
      case 'Near Limit':
        return 'border border-[#fde68a] bg-[#fef3c7] text-[#b45309]';
      case 'Over Limit':
        return 'border border-red-200 bg-red-100 text-red-900';
    }
  }
}