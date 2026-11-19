import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AgnosticItemKind,
  AgnosticProductRecord,
} from '../proprietary-products-list-widget/proprietary-products-list-widget';

@Component({
  selector: 'app-edit-product-form',
  imports: [FormsModule],
  templateUrl: './edit-product-form.html',
  styleUrl: './edit-product-form.css',
})
export class EditProductForm {
  product = input.required<AgnosticProductRecord>();
  close = output<void>();
  save = output<AgnosticProductRecord>();

  sku = signal('');
  name = signal('');
  itemKind = signal<AgnosticItemKind>('Finished Good');
  category = signal('');
  unitOfMeasure = signal('');
  standardCost = signal<number>(0);
  basePrice = signal<number>(0);
  status = signal<'Active' | 'Inactive'>('Active');
  notes = signal('');
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const item = this.product();
      this.sku.set(item.sku);
      this.name.set(item.name);
      this.itemKind.set(item.itemKind);
      this.category.set(item.category);
      this.unitOfMeasure.set(item.unitOfMeasure);
      this.standardCost.set(item.standardCost);
      this.basePrice.set(item.basePrice);
      this.status.set(item.status);
      this.notes.set(item.notes);
    });
  }

  submitForm() {
    const cleanSku = this.sku().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanSku || !cleanName) {
      this.errorMessage.set('SKU / Code and Item Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.product().id,
      sku: cleanSku,
      name: cleanName,
      itemKind: this.itemKind(),
      category: this.category().trim() || 'Uncategorized',
      unitOfMeasure: this.unitOfMeasure().trim() || 'Unit',
      standardCost: Math.max(0, Number(this.standardCost()) || 0),
      basePrice: Math.max(0, Number(this.basePrice()) || 0),
      status: this.status(),
      notes: this.notes().trim(),
    });
  }
}