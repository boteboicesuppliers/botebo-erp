import { Component, computed, signal } from '@angular/core';
import { NewRawMaterialForm } from '../new-raw-material-form/new-raw-material-form';
import { EditRawMaterialForm } from '../edit-raw-material-form/edit-raw-material-form';
import { DeleteRawMaterialForm } from '../delete-raw-material-form/delete-raw-material-form';

export type MaterialCategoryType = 'Packaging' | 'Raw Material' | 'Consumable';

export interface RawMaterialRecord {
  id: string;
  sku: string;
  name: string;
  materialType: MaterialCategoryType;
  unitOfMeasure: string;
  stockOnHand: number;
  reorderLevel: number;
  unitCost: number;
  preferredSupplier: string;
  leadTimeDays: number;
  active: boolean;
}

@Component({
  selector: 'app-raw-materials-and-packaging-list-widget',
  imports: [NewRawMaterialForm, EditRawMaterialForm, DeleteRawMaterialForm],
  templateUrl: './raw-materials-and-packaging-list-widget.html',
  styleUrl: './raw-materials-and-packaging-list-widget.css',
})
export class RawMaterialsAndPackagingListWidget {
  typeFilter = signal<'All' | MaterialCategoryType>('All');
  stockFilter = signal<'All' | 'Low Stock' | 'Healthy'>('All');
  searchQuery = signal('');
  showNewModal = signal(false);
  editingMaterial = signal<RawMaterialRecord | null>(null);
  deletingMaterial = signal<RawMaterialRecord | null>(null);

  materials = signal<RawMaterialRecord[]>([
    {
      id: 'RM-1',
      sku: 'PKG-BAG-2KG',
      name: 'Food-Grade 2kg Ice Poly Bag Roll',
      materialType: 'Packaging',
      unitOfMeasure: 'Rolls (1,000)',
      stockOnHand: 36,
      reorderLevel: 20,
      unitCost: 145,
      preferredSupplier: 'Highveld Packaging',
      leadTimeDays: 3,
      active: true,
    },
    {
      id: 'RM-2',
      sku: 'PKG-BAG-5KG',
      name: 'Food-Grade 5kg Ice Poly Bag Roll',
      materialType: 'Packaging',
      unitOfMeasure: 'Rolls (1,000)',
      stockOnHand: 12,
      reorderLevel: 18,
      unitCost: 210,
      preferredSupplier: 'Highveld Packaging',
      leadTimeDays: 3,
      active: true,
    },
    {
      id: 'RM-3',
      sku: 'PKG-TIE-WIRE',
      name: 'Bag Twist Ties / Seals',
      materialType: 'Packaging',
      unitOfMeasure: 'Packs (2,500)',
      stockOnHand: 28,
      reorderLevel: 15,
      unitCost: 65,
      preferredSupplier: 'Pretoria Pack & Seal',
      leadTimeDays: 2,
      active: true,
    },
    {
      id: 'RM-4',
      sku: 'RAW-WTR-FILT',
      name: 'RO Filtration & Purification Cartridges',
      materialType: 'Raw Material',
      unitOfMeasure: 'Sets',
      stockOnHand: 4,
      reorderLevel: 6,
      unitCost: 890,
      preferredSupplier: 'AquaPure Industrial',
      leadTimeDays: 5,
      active: true,
    },
    {
      id: 'RM-5',
      sku: 'CON-RFR-404A',
      name: 'Chiller Refrigerant & Plant Consumables',
      materialType: 'Consumable',
      unitOfMeasure: 'Units',
      stockOnHand: 24,
      reorderLevel: 10,
      unitCost: 520,
      preferredSupplier: 'ColdTech Supplies',
      leadTimeDays: 4,
      active: true,
    },
  ]);

  isLowStock(item: RawMaterialRecord): boolean {
    return item.stockOnHand <= item.reorderLevel;
  }

  filteredMaterials = computed(() => {
    const tf = this.typeFilter();
    const sf = this.stockFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.materials().filter((item) => {
      const matchesType = tf === 'All' || item.materialType === tf;
      const matchesStock =
        sf === 'All' ||
        (sf === 'Low Stock' ? this.isLowStock(item) : !this.isLowStock(item));
      const matchesQuery =
        !q ||
        item.sku.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.preferredSupplier.toLowerCase().includes(q);
      return matchesType && matchesStock && matchesQuery;
    });
  });

  lowStockCount = computed(() =>
    this.materials().filter((item) => this.isLowStock(item)).length
  );

  addMaterial(newItem: Omit<RawMaterialRecord, 'id'>) {
    const created: RawMaterialRecord = {
      ...newItem,
      id: `RM-${Date.now().toString().slice(-4)}`,
    };
    this.materials.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateMaterial(updated: RawMaterialRecord) {
    this.materials.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingMaterial.set(null);
  }

  deleteMaterial(id: string) {
    this.materials.update((list) => list.filter((item) => item.id !== id));
    this.deletingMaterial.set(null);
  }
}