import { Component, computed, signal } from '@angular/core';
import { NewCategoryForm } from '../new-category-form/new-category-form';
import { EditCategoryForm } from '../edit-category-form/edit-category-form';
import { DeleteCategoryForm } from '../delete-category-form/delete-category-form';

export interface ProductCategoryRecord {
  id: string;
  code: string;
  name: string;
  productionDepartment: string;
  businessUnit: string;
  glAccountMapping: string;
  status: 'Active' | 'Inactive';
  description: string;
}

@Component({
  selector: 'app-categories-list-widget',
  imports: [NewCategoryForm, EditCategoryForm, DeleteCategoryForm],
  templateUrl: './categories-list-widget.html',
  styleUrl: './categories-list-widget.css',
})
export class CategoriesListWidget {
  searchQuery = signal('');
  statusFilter = signal<'All' | 'Active' | 'Inactive'>('All');
  showNewModal = signal(false);
  editingCategory = signal<ProductCategoryRecord | null>(null);
  deletingCategory = signal<ProductCategoryRecord | null>(null);

  categories = signal<ProductCategoryRecord[]>([
    {
      id: 'CAT-1',
      code: 'CAT-BAG-ICE',
      name: 'Bagged Ice (2kg / 5kg / Bulk)',
      productionDepartment: 'Bagging, Palletizing & Cold Storage',
      businessUnit: 'Botebo Ice Suppliers',
      glAccountMapping: '4000 - Ice Sales Revenue',
      status: 'Active',
      description: 'Retail and hospitality bagged ice SKUs.',
    },
    {
      id: 'CAT-2',
      code: 'CAT-BLK-ICE',
      name: 'Industrial & Block Ice',
      productionDepartment: 'Ice Freezing & Chiller Plant',
      businessUnit: 'Botebo Ice Suppliers',
      glAccountMapping: '4100 - Contract & Event Sales',
      status: 'Active',
      description: 'High-density ice blocks and bulk cold-chain supply.',
    },
    {
      id: 'CAT-3',
      code: 'CAT-PKG',
      name: 'Packaging & Cold Chain Consumables',
      productionDepartment: 'Bagging, Palletizing & Cold Storage',
      businessUnit: 'Botebo Ice Suppliers',
      glAccountMapping: '1210 - Packaging Stock',
      status: 'Active',
      description: 'Poly bags, seals, pallet wrap, and refrigerant consumables.',
    },
  ]);

  filteredCategories = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const st = this.statusFilter();

    return this.categories().filter((c) => {
      const matchesStatus = st === 'All' || c.status === st;
      const matchesQuery =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.productionDepartment.toLowerCase().includes(q) ||
        c.glAccountMapping.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  });

  addCategory(newItem: Omit<ProductCategoryRecord, 'id'>) {
    const created: ProductCategoryRecord = {
      ...newItem,
      id: `CAT-${Date.now().toString().slice(-4)}`,
    };
    this.categories.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateCategory(updated: ProductCategoryRecord) {
    this.categories.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingCategory.set(null);
  }

  deleteCategory(id: string) {
    this.categories.update((list) => list.filter((item) => item.id !== id));
    this.deletingCategory.set(null);
  }
}