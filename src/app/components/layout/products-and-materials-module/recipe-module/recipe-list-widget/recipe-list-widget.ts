import { Component, computed, signal } from '@angular/core';
import { NewRecipeForm } from '../new-recipe-form/new-recipe-form';
import { EditRecipeForm } from '../edit-recipe-form/edit-recipe-form';
import { DeleteRecipeForm } from '../delete-recipe-form/delete-recipe-form';

export interface RecipeRecord {
  id: string;
  bomCode: string;
  finishedGoodSku: string;
  finishedGoodName: string;
  version: string;
  batchYieldQty: number;
  yieldUnit: string;
  primaryComponent: string;
  estimatedBatchCost: number;
  status: 'Active' | 'Draft';
}

@Component({
  selector: 'app-recipe-list-widget',
  imports: [NewRecipeForm, EditRecipeForm, DeleteRecipeForm],
  templateUrl: './recipe-list-widget.html',
  styleUrl: './recipe-list-widget.css',
})
export class RecipeListWidget {
  statusFilter = signal<'All' | 'Active' | 'Draft'>('All');
  searchQuery = signal('');
  showNewModal = signal(false);
  editingRecipe = signal<RecipeRecord | null>(null);
  deletingRecipe = signal<RecipeRecord | null>(null);

  recipes = signal<RecipeRecord[]>([
    {
      id: 'BOM-1',
      bomCode: 'BOM-ICE-2KG',
      finishedGoodSku: 'ICE-2KG-BAG',
      finishedGoodName: '2kg Party Cube Ice Bag',
      version: 'v1.2',
      batchYieldQty: 500,
      yieldUnit: 'Bags',
      primaryComponent: 'PKG-BAG-2KG + Purified Water',
      estimatedBatchCost: 1120.0,
      status: 'Active',
    },
    {
      id: 'BOM-2',
      bomCode: 'BOM-ICE-5KG',
      finishedGoodSku: 'ICE-5KG-BAG',
      finishedGoodName: '5kg Commercial Cube Ice Bag',
      version: 'v1.1',
      batchYieldQty: 300,
      yieldUnit: 'Bags',
      primaryComponent: 'PKG-BAG-5KG + Purified Water',
      estimatedBatchCost: 1480.0,
      status: 'Active',
    },
    {
      id: 'BOM-3',
      bomCode: 'BOM-ICE-10KG',
      finishedGoodSku: 'ICE-10KG-BLK',
      finishedGoodName: '10kg Block Ice',
      version: 'v1.0',
      batchYieldQty: 100,
      yieldUnit: 'Blocks',
      primaryComponent: 'Freezer Moulds + Purified Water',
      estimatedBatchCost: 840.0,
      status: 'Active',
    },
  ]);

  filteredRecipes = computed(() => {
    const st = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.recipes().filter((r) => {
      const matchesStatus = st === 'All' || r.status === st;
      const matchesQuery =
        !q ||
        r.bomCode.toLowerCase().includes(q) ||
        r.finishedGoodSku.toLowerCase().includes(q) ||
        r.finishedGoodName.toLowerCase().includes(q) ||
        r.primaryComponent.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  });

  addRecipe(newItem: Omit<RecipeRecord, 'id'>) {
    const created: RecipeRecord = {
      ...newItem,
      id: `BOM-${Date.now().toString().slice(-4)}`,
    };
    this.recipes.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateRecipe(updated: RecipeRecord) {
    this.recipes.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingRecipe.set(null);
  }

  deleteRecipe(id: string) {
    this.recipes.update((list) => list.filter((item) => item.id !== id));
    this.deletingRecipe.set(null);
  }
}