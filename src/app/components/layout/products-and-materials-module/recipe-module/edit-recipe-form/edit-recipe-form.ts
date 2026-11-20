import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeRecord } from '../recipe-list-widget/recipe-list-widget';

@Component({
  selector: 'app-edit-recipe-form',
  imports: [FormsModule],
  templateUrl: './edit-recipe-form.html',
  styleUrl: './edit-recipe-form.css',
})
export class EditRecipeForm {
  recipe = input.required<RecipeRecord>();
  close = output<void>();
  save = output<RecipeRecord>();

  bomCode = signal('');
  finishedGoodSku = signal('');
  finishedGoodName = signal('');
  version = signal('v1.0');
  batchYieldQty = signal<number>(1);
  yieldUnit = signal('Units');
  primaryComponent = signal('');
  estimatedBatchCost = signal<number>(0);
  status = signal<'Active' | 'Draft'>('Active');
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const r = this.recipe();
      this.bomCode.set(r.bomCode);
      this.finishedGoodSku.set(r.finishedGoodSku);
      this.finishedGoodName.set(r.finishedGoodName);
      this.version.set(r.version);
      this.batchYieldQty.set(r.batchYieldQty);
      this.yieldUnit.set(r.yieldUnit);
      this.primaryComponent.set(r.primaryComponent);
      this.estimatedBatchCost.set(r.estimatedBatchCost);
      this.status.set(r.status);
    });
  }

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
      id: this.recipe().id,
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