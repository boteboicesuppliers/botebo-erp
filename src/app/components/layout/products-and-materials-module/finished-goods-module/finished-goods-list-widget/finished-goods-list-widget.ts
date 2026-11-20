import { Component, computed, signal } from '@angular/core';
import { NewFinishedGoodForm } from '../new-finished-good-form/new-finished-good-form';
import { EditFinishedGoodForm } from '../edit-finished-good-form/edit-finished-good-form';
import { DeleteFinishedGoodForm } from '../delete-finished-good-form/delete-finished-good-form';

export interface FinishedGoodRecord {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  category: string;
  location: string;
  unitOfMeasure: string;
  onHandQty: number;
  reservedQty: number;
  reorderPoint: number;
  unitCost: number;
  unitPrice: number;
  active: boolean;
}

@Component({
  selector: 'app-finished-goods-list-widget',
  imports: [NewFinishedGoodForm, EditFinishedGoodForm, DeleteFinishedGoodForm],
  templateUrl: './finished-goods-list-widget.html',
  styleUrl: './finished-goods-list-widget.css',
})
export class FinishedGoodsListWidget {
  categoryFilter = signal<string>('All');
  searchQuery = signal('');
  showNewModal = signal(false);
  editingProduct = signal<FinishedGoodRecord | null>(null);
  deletingProduct = signal<FinishedGoodRecord | null>(null);

  products = signal<FinishedGoodRecord[]>([
    {
      id: 'FG-1',
      sku: 'ICE-2KG-BAG',
      name: '2kg Party Cube Ice Bag',
      packSize: '2kg',
      category: 'Bagged Ice',
      location: 'Cold Room A - Bagged Ice',
      unitOfMeasure: 'Bags',
      onHandQty: 1420,
      reservedQty: 260,
      reorderPoint: 500,
      unitCost: 6.2,
      unitPrice: 12.0,
      active: true,
    },
    {
      id: 'FG-2',
      sku: 'ICE-5KG-BAG',
      name: '5kg Commercial Cube Ice Bag',
      packSize: '5kg',
      category: 'Bagged Ice',
      location: 'Cold Room A - Bagged Ice',
      unitOfMeasure: 'Bags',
      onHandQty: 860,
      reservedQty: 310,
      reorderPoint: 400,
      unitCost: 12.5,
      unitPrice: 24.0,
      active: true,
    },
    {
      id: 'FG-3',
      sku: 'ICE-10KG-BLK',
      name: '10kg Block Ice',
      packSize: '10kg',
      category: 'Block Ice',
      location: 'Blast Freezer B - Block Ice',
      unitOfMeasure: 'Blocks',
      onHandQty: 310,
      reservedQty: 80,
      reorderPoint: 150,
      unitCost: 18.0,
      unitPrice: 35.0,
      active: true,
    },
    {
      id: 'FG-4',
      sku: 'ICE-25KG-BLK',
      name: '25kg Bulk Event Block Ice',
      packSize: '25kg',
      category: 'Block Ice',
      location: 'Blast Freezer B - Block Ice',
      unitOfMeasure: 'Blocks',
      onHandQty: 95,
      reservedQty: 40,
      reorderPoint: 100,
      unitCost: 38.0,
      unitPrice: 72.0,
      active: true,
    },
  ]);

  categories = computed(() => {
    const unique = new Set(this.products().map((p) => p.category));
    return ['All', ...Array.from(unique)];
  });

  getAvailableQty(product: FinishedGoodRecord): number {
    return Math.max(0, product.onHandQty - product.reservedQty);
  }

  filteredProducts = computed(() => {
    const cat = this.categoryFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.products().filter((p) => {
      const matchesCategory = cat === 'All' || p.category === cat;
      const matchesQuery =
        !q ||
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.packSize.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  });

  addProduct(newItem: Omit<FinishedGoodRecord, 'id'>) {
    const created: FinishedGoodRecord = {
      ...newItem,
      id: `FG-${Date.now().toString().slice(-4)}`,
    };
    this.products.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateProduct(updated: FinishedGoodRecord) {
    this.products.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingProduct.set(null);
  }

  deleteProduct(id: string) {
    this.products.update((list) => list.filter((item) => item.id !== id));
    this.deletingProduct.set(null);
  }
}