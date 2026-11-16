import { Component, computed, signal } from '@angular/core';

export interface QuotationRecord {
  id: string;
  client: string;
  tier: string;
  createdDate: string;
  expiryDate: string;
  isExpiringSoon: boolean;
  value: number;
  margin: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Expired' | 'Converted';
}

@Component({
  selector: 'app-quotations-list-widget',
  imports: [],
  templateUrl: './quotations-list-widget.html',
  styleUrl: './quotations-list-widget.css',
})
export class QuotationsListWidget {
  searchQuery = signal('');
  selectedStatus = signal<string>('All');

  quotations = signal<QuotationRecord[]>([
    {
      id: 'QT-2026-0849',
      client: 'Botebo Ice Distributors',
      tier: 'Tier 1 · Bulk Wholesale',
      createdDate: '2026-11-10',
      expiryDate: '2026-11-25',
      isExpiringSoon: false,
      value: 145200,
      margin: 24.5,
      status: 'Sent'
    },
    {
      id: 'QT-2026-0850',
      client: 'Gauteng Retail Group',
      tier: 'Tier 2 · Contract',
      createdDate: '2026-11-11',
      expiryDate: '2026-11-17',
      isExpiringSoon: true,
      value: 89000,
      margin: 17.2,
      status: 'Draft'
    },
    {
      id: 'QT-2026-0851',
      client: 'Soweto Beverage Logistics',
      tier: 'Tier 1 · Bulk Wholesale',
      createdDate: '2026-11-05',
      expiryDate: '2026-11-18',
      isExpiringSoon: true,
      value: 230400,
      margin: 19.1,
      status: 'Accepted'
    },
    {
      id: 'QT-2026-0852',
      client: 'Sandton Forecourt Supplies',
      tier: 'Tier 3 · Standard',
      createdDate: '2026-10-28',
      expiryDate: '2026-11-04',
      isExpiringSoon: false,
      value: 54000,
      margin: 28.0,
      status: 'Expired'
    },
    {
      id: 'QT-2026-0853',
      client: 'Midrand Cold Storage',
      tier: 'Tier 2 · Contract',
      createdDate: '2026-11-02',
      expiryDate: '2026-11-16',
      isExpiringSoon: false,
      value: 312000,
      margin: 22.4,
      status: 'Converted'
    }
  ]);

  filteredQuotations = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    
    return this.quotations().filter(item => {
      const matchesSearch = item.id.toLowerCase().includes(q) || item.client.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || item.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  getStatusClass(status: string): string {
    switch (status) {
      case 'Accepted':
      case 'Converted':
        return 'bg-emerald-100 text-emerald-900';
      case 'Sent':
        return 'bg-sky-100 text-sky-900';
      case 'Draft':
        return 'bg-amber-100 text-amber-900';
      case 'Expired':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-[#e1e6ed] text-[#374151]';
    }
  }
}