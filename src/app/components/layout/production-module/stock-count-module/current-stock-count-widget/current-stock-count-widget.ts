import { Component, computed, signal } from '@angular/core';
import { UpdateStockCountForm } from '../update-stock-count-form/update-stock-count-form';

export type StockCountStatus = 'Matched' | 'Variance' | 'Pending Count';

export interface StockCountItemRecord {
  id: string;
  sku: string;
  itemName: string;
  zone: string;
  unitOfMeasure: string;
  systemQty: number;
  countedQty: number | null;
  lastCountedAt: string;
  countedBy: string;
}

@Component({
  selector: 'app-current-stock-count-widget',
  imports: [UpdateStockCountForm],
  templateUrl: './current-stock-count-widget.html',
  styleUrl: './current-stock-count-widget.css',
})
export class CurrentStockCountWidget {
  zoneFilter = signal<string>('All');
  statusFilter = signal<'All' | StockCountStatus>('All');
  searchQuery = signal<string>('');
  activeItem = signal<StockCountItemRecord | null>(null);

  items = signal<StockCountItemRecord[]>([
    {
      id: 'SC-1',
      sku: 'ICE-2KG-BAG',
      itemName: '2kg Party Cube Ice Bag',
      zone: 'Cold Room A - Bagged Ice',
      unitOfMeasure: 'Bags',
      systemQty: 1420,
      countedQty: 1420,
      lastCountedAt: '2026-11-20 00:30',
      countedBy: 'T. Mokoena',
    },
    {
      id: 'SC-2',
      sku: 'ICE-5KG-BAG',
      itemName: '5kg Commercial Cube Ice Bag',
      zone: 'Cold Room A - Bagged Ice',
      unitOfMeasure: 'Bags',
      systemQty: 860,
      countedQty: 842,
      lastCountedAt: '2026-11-20 00:45',
      countedBy: 'T. Mokoena',
    },
    {
      id: 'SC-3',
      sku: 'ICE-10KG-BLK',
      itemName: '10kg Block Ice',
      zone: 'Blast Freezer B - Block Ice',
      unitOfMeasure: 'Blocks',
      systemQty: 310,
      countedQty: null,
      lastCountedAt: '—',
      countedBy: '—',
    },
    {
      id: 'SC-4',
      sku: 'PKG-POLY-5KG',
      itemName: 'Food-Grade 5kg Ice Poly Bag',
      zone: 'Packaging Store - Dry Goods',
      unitOfMeasure: 'Rolls (1,000)',
      systemQty: 48,
      countedQty: 51,
      lastCountedAt: '2026-11-19 22:15',
      countedBy: 'K. Dlamini',
    },
    {
      id: 'SC-5',
      sku: 'RM-RFR-404A',
      itemName: 'Chiller Refrigerant & Water Treatment',
      zone: 'Plant Room - Consumables',
      unitOfMeasure: 'Units',
      systemQty: 24,
      countedQty: null,
      lastCountedAt: '—',
      countedBy: '—',
    },
  ]);

  zones = computed(() => {
    const unique = new Set(this.items().map((i) => i.zone));
    return ['All', ...Array.from(unique)];
  });

  getVariance(item: StockCountItemRecord): number | null {
    if (item.countedQty === null) return null;
    return item.countedQty - item.systemQty;
  }

  getStatus(item: StockCountItemRecord): StockCountStatus {
    if (item.countedQty === null) return 'Pending Count';
    return item.countedQty === item.systemQty ? 'Matched' : 'Variance';
  }

  filteredItems = computed(() => {
    const z = this.zoneFilter();
    const st = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.items().filter((item) => {
      const matchesZone = z === 'All' || item.zone === z;
      const matchesStatus = st === 'All' || this.getStatus(item) === st;
      const matchesQuery =
        !q ||
        item.sku.toLowerCase().includes(q) ||
        item.itemName.toLowerCase().includes(q) ||
        item.zone.toLowerCase().includes(q) ||
        item.countedBy.toLowerCase().includes(q);
      return matchesZone && matchesStatus && matchesQuery;
    });
  });

  summary = computed(() => {
    const all = this.items();
    let matched = 0;
    let variance = 0;
    let pending = 0;

    for (const item of all) {
      const status = this.getStatus(item);
      if (status === 'Matched') matched++;
      else if (status === 'Variance') variance++;
      else pending++;
    }

    return {
      total: all.length,
      matched,
      variance,
      pending,
    };
  });

  applyStockCount(payload: {
    id: string;
    countedQty: number;
    countedBy: string;
    notes?: string;
  }) {
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    this.items.update((list) =>
      list.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              countedQty: payload.countedQty,
              countedBy: payload.countedBy,
              lastCountedAt: timestamp,
            }
          : item
      )
    );
    this.activeItem.set(null);
  }

  formatVariance(variance: number | null): string {
    if (variance === null) return '—';
    return variance > 0 ? `+${variance}` : `${variance}`;
  }
}