import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type CatalogKind = 'Finished Good' | 'Raw Material' | 'Packaging';

export interface ProductMaterialOverviewRecord {
  id: string;
  sku: string;
  name: string;
  catalogKind: CatalogKind;
  category: string;
  location: string;
  unitOfMeasure: string;
  onHandQty: number;
  reorderPoint: number;
  unitCost: number;
  active: boolean;
}

@Component({
  selector: 'app-products-and-materials-primary-view',
  imports: [RouterLink],
  templateUrl: './products-and-materials-primary.html',
  styleUrl: './products-and-materials-primary.css',
})
export class ProductsAndMaterialsPrimary {
  kindFilter = signal<'All' | CatalogKind>('All');
  searchQuery = signal('');

  items = signal<ProductMaterialOverviewRecord[]>([
    {
      id: 'PM-1',
      sku: 'ICE-2KG-BAG',
      name: '2kg Party Cube Ice Bag',
      catalogKind: 'Finished Good',
      category: 'Bagged Ice',
      location: 'Cold Room A - Bagged Ice',
      unitOfMeasure: 'Bags',
      onHandQty: 1420,
      reorderPoint: 500,
      unitCost: 8.5,
      active: true,
    },
    {
      id: 'PM-2',
      sku: 'ICE-5KG-BAG',
      name: '5kg Commercial Cube Ice Bag',
      catalogKind: 'Finished Good',
      category: 'Bagged Ice',
      location: 'Cold Room A - Bagged Ice',
      unitOfMeasure: 'Bags',
      onHandQty: 860,
      reorderPoint: 400,
      unitCost: 16.0,
      active: true,
    },
    {
      id: 'PM-3',
      sku: 'ICE-10KG-BLK',
      name: '10kg Block Ice',
      catalogKind: 'Finished Good',
      category: 'Block Ice',
      location: 'Blast Freezer B - Block Ice',
      unitOfMeasure: 'Blocks',
      onHandQty: 310,
      reorderPoint: 150,
      unitCost: 24.0,
      active: true,
    },
    {
      id: 'PM-4',
      sku: 'PKG-BAG-2KG',
      name: 'Food-Grade 2kg Ice Poly Bag Roll',
      catalogKind: 'Packaging',
      category: 'Poly Bags',
      location: 'Packaging Store - Dry Goods',
      unitOfMeasure: 'Rolls (1,000)',
      onHandQty: 36,
      reorderPoint: 20,
      unitCost: 145.0,
      active: true,
    },
    {
      id: 'PM-5',
      sku: 'RAW-WTR-FILT',
      name: 'RO Filtration & Purification Cartridges',
      catalogKind: 'Raw Material',
      category: 'Water Treatment',
      location: 'Plant Room - Consumables',
      unitOfMeasure: 'Sets',
      onHandQty: 4,
      reorderPoint: 6,
      unitCost: 890.0,
      active: true,
    },
  ]);

  filteredItems = computed(() => {
    const kind = this.kindFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.items().filter((item) => {
      const matchesKind = kind === 'All' || item.catalogKind === kind;
      const matchesQuery =
        !q ||
        item.sku.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);
      return matchesKind && matchesQuery;
    });
  });

  summary = computed(() => {
    const all = this.items();
    return {
      total: all.length,
      finishedGoods: all.filter((i) => i.catalogKind === 'Finished Good').length,
      materialsAndPackaging: all.filter((i) => i.catalogKind !== 'Finished Good').length,
      lowStock: all.filter((i) => i.onHandQty <= i.reorderPoint).length,
    };
  });
}