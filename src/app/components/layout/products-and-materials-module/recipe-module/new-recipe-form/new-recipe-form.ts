import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeRecord } from '../recipe-list-widget/recipe-list-widget';

@Component({
  selector: 'app-new-recipe-form',
  imports: [FormsModule],
  templateUrl: './new-recipe-form.html',
  styleUrl: './new-recipe-form.css',
})
export class NewRecipeForm {
  close = output<void>();
  save = output<Omit<RecipeRecord, 'id'>>();

  bomCode = signal('');
  finishedGoodSku = signal('');
  finishedGoodName = signal('');
  version = signal('v1.0');
  batchYieldQty = signal<number>(500);
  yieldUnit = signal('Bags');
  primaryComponent = signal('PKG-BAG-2KG + Purified Water');
  estimatedBatchCost = signal<number>(0);
  status = signal<'Active' | 'Draft'>('Active');
  errorMessage = signal('');

  submitForm() {
    const cleanCode = this.bomCode().trim().toUpperCase();
    const cleanSku = this.finishedGoodSku().trim().toUpperCase();
    const cleanName = this.finishedGoodName().trim();

    if (!cleanCode || !cleanSku || !cleanName) {
      this.errorMessage.set('BOM Code, Finished Good SKU, and Finished Good Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      bomCode: cleanCode,
      finishedGoodSku: cleanSku,
      finishedGoodName: cleanName,
      version: this.version().trim() || 'v1.0',
      batchYieldQty: Math.max(1, Number(this.batchYieldQty()) || 1),
      yieldUnit: this.yieldUnit().trim() || 'Units',
      primaryComponent: this.primaryComponent().trim() || 'Standard Inputs',
      estimatedBatchCost: Math.max(0, Number(this.estimatedBatchCost()) || 0),
      status: this.status(),
    });
  }
}