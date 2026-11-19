import { Component, computed, signal } from '@angular/core';
import { UpdatePriceListForm } from '../update-price-list-form/update-price-list-form';
import { EditRateForm } from '../edit-rate-form/edit-rate-form';
import { DeleteRateForm } from '../delete-rate-form/delete-rate-form';

export type PriceTier = 'Contract Tier 1' | 'Wholesale Volume' | 'Spot Market Rate';

export interface SupplierPriceRecord {
  id: string;
  supplier: string;
  item: string;
  unitRate: number;
  currentPrice: string;
  effectiveDate: string;
  tier: PriceTier;
}

@Component({
  selector: 'app-supplier-price-list-widget',
  imports: [
    UpdatePriceListForm,
    EditRateForm,
    DeleteRateForm,
  ],
  templateUrl: './supplier-price-list-widget.html',
  styleUrl: './supplier-price-list-widget.css',
})
export class SupplierPriceListWidget {
  showUpdateModal = signal(false);
  editingRate = signal<SupplierPriceRecord | null>(null);
  deletingRate = signal<SupplierPriceRecord | null>(null);

  searchQuery = signal('');
  selectedTier = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  prices = signal<SupplierPriceRecord[]>([
    {
      id: 'SPL-2026-001',
      supplier: 'Gauteng Chemical Supplies',
      item: 'Ammonia Refrigerant (per kg)',
      unitRate: 85.00,
      currentPrice: 'R 85.00',
      effectiveDate: '2026-10-01',
      tier: 'Contract Tier 1',
    },
    {
      id: 'SPL-2026-002',
      supplier: 'Mpumalanga Packaging Corp',
      item: 'LDPE Film Roll (per unit)',
      unitRate: 340.00,
      currentPrice: 'R 340.00',
      effectiveDate: '2026-11-01',
      tier: 'Wholesale Volume',
    },
    {
      id: 'SPL-2026-003',
      supplier: 'Pretoria Industrial Pumps & Valves',
      item: 'Stainless Steel Filtration Cartridge (per unit)',
      unitRate: 804.17,
      currentPrice: 'R 804.17',
      effectiveDate: '2026-11-10',
      tier: 'Contract Tier 1',
    },
  ]);

  filteredPrices = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const tier = this.selectedTier();

    return this.prices().filter((entry) => {
      const matchesSearch =
        entry.id.toLowerCase().includes(q) ||
        entry.supplier.toLowerCase().includes(q) ||
        entry.item.toLowerCase().includes(q) ||
        entry.tier.toLowerCase().includes(q);
      const matchesTier = tier === 'All' || entry.tier === tier;
      return matchesSearch && matchesTier;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredPrices().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredPrices().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredPrices().length));

  paginatedPrices = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredPrices().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  formatCurrency(amount: number): string {
    return 'R ' + amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  handleAddPriceEntry(data: Omit<SupplierPriceRecord, 'id' | 'currentPrice'>) {
    const nextNum = this.prices().length + 1;
    const formatted = this.formatCurrency(data.unitRate);
    const created: SupplierPriceRecord = {
      id: `SPL-2026-${String(nextNum).padStart(3, '0')}`,
      ...data,
      currentPrice: formatted,
    };
    this.prices.update((list) => [created, ...list]);
    this.showUpdateModal.set(false);
  }

  handleSaveEditedRate(updated: SupplierPriceRecord) {
    const normalized: SupplierPriceRecord = {
      ...updated,
      currentPrice: this.formatCurrency(updated.unitRate),
    };
    this.prices.update((list) =>
      list.map((entry) => (entry.id === normalized.id ? normalized : entry))
    );
    this.editingRate.set(null);
  }

  handleDeleteRate(id: string) {
    this.prices.update((list) => list.filter((entry) => entry.id !== id));
    this.deletingRate.set(null);
  }

  getTierBadgeClass(tier: PriceTier): string {
    switch (tier) {
      case 'Contract Tier 1':
        return 'bg-emerald-100 text-emerald-900';
      case 'Wholesale Volume':
        return 'bg-sky-100 text-sky-900';
      case 'Spot Market Rate':
        return 'bg-amber-100 text-amber-900';
    }
  }
}