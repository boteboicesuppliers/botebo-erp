import { Component, computed, signal } from '@angular/core';
import { NewProductForm } from '../new-product-form/new-product-form';
import { EditProductForm } from '../edit-product-form/edit-product-form';
import { DeleteProductForm } from '../delete-product-form/delete-product-form';

export type AgnosticItemKind = 'Finished Good' | 'Raw Material' | 'Packaging' | 'Service';

export interface AgnosticProductRecord {
  id: string;
  sku: string;
  name: string;
  itemKind: AgnosticItemKind;
  category: string;
  unitOfMeasure: string;
  standardCost: number;
  basePrice: number;
  status: 'Active' | 'Inactive';
  notes: string;
}

@Component({
  selector: 'app-proprietary-products-list-widget',
  imports: [NewProductForm, EditProductForm, DeleteProductForm],
  templateUrl: './proprietary-products-list-widget.html',
  styleUrl: './proprietary-products-list-widget.css',
})
export class ProprietaryProductsListWidget {
  searchQuery = signal('');
  kindFilter = signal<'All' | AgnosticItemKind>('All');
  statusFilter = signal<'All' | 'Active' | 'Inactive'>('All');
  showNewModal = signal(false);
  editingProduct = signal<AgnosticProductRecord | null>(null);
  deletingProduct = signal<AgnosticProductRecord | null>(null);

  products = signal<AgnosticProductRecord[]>([
    {
      id: 'PRD-1',
      sku: 'ICE-2KG-BAG',
      name: '2kg Party Cube Ice Bag',
      itemKind: 'Finished Good',
      category: 'Bagged Ice (2kg / 5kg / Bulk)',
      unitOfMeasure: 'Bag (2kg)',
      standardCost: 6.5,
      basePrice: 14.0,
      status: 'Active',
      notes: 'Standard retail & hospitality party ice bag.',
    },
    {
      id: 'PRD-2',
      sku: 'ICE-5KG-BAG',
      name: '5kg Commercial Cube Ice Bag',
      itemKind: 'Finished Good',
      category: 'Bagged Ice (2kg / 5kg / Bulk)',
      unitOfMeasure: 'Bag (5kg)',
      standardCost: 13.0,
      basePrice: 28.0,
      status: 'Active',
      notes: 'High-volume restaurant and event ice bag.',
    },
    {
      id: 'PRD-3',
      sku: 'PKG-POLY-5KG',
      name: 'Food-Grade 5kg Ice Poly Bag',
      itemKind: 'Packaging',
      category: 'Packaging & Cold Chain Consumables',
      unitOfMeasure: 'Roll / 1,000',
      standardCost: 420.0,
      basePrice: 0,
      status: 'Active',
      notes: 'Low-temperature polyethylene bag stock.',
    },
    {
      id: 'PRD-4',
      sku: 'RM-RFR-404A',
      name: 'Chiller Refrigerant & Water Treatment',
      itemKind: 'Raw Material',
      category: 'Packaging & Cold Chain Consumables',
      unitOfMeasure: 'Litre / Kg',
      standardCost: 185.0,
      basePrice: 0,
      status: 'Active',
      notes: 'Plant cooling & filtration consumables.',
    },
    {
      id: 'PRD-5',
      sku: 'SRV-COLD-DLV',
      name: 'Dedicated Cold-Chain Delivery',
      itemKind: 'Service',
      category: 'Industrial & Block Ice',
      unitOfMeasure: 'Trip',
      standardCost: 350.0,
      basePrice: 650.0,
      status: 'Active',
      notes: 'Scheduled refrigerated route delivery service.',
    },
  ]);

  filteredProducts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const kind = this.kindFilter();
    const st = this.statusFilter();

    return this.products().filter((p) => {
      const matchesKind = kind === 'All' || p.itemKind === kind;
      const matchesStatus = st === 'All' || p.status === st;
      const matchesQuery =
        !q ||
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.unitOfMeasure.toLowerCase().includes(q);
      return matchesKind && matchesStatus && matchesQuery;
    });
  });

  addProduct(newItem: Omit<AgnosticProductRecord, 'id'>) {
    const created: AgnosticProductRecord = {
      ...newItem,
      id: `PRD-${Date.now().toString().slice(-4)}`,
    };
    this.products.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateProduct(updated: AgnosticProductRecord) {
    this.products.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingProduct.set(null);
  }

  deleteProduct(id: string) {
    this.products.update((list) => list.filter((item) => item.id !== id));
    this.deletingProduct.set(null);
  }

  formatZar(amount: number): string {
    return `R ${amount.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}