import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AgnosticItemKind,
  AgnosticProductRecord,
} from '../proprietary-products-list-widget/proprietary-products-list-widget';

@Component({
  selector: 'app-new-product-form',
  imports: [FormsModule],
  templateUrl: './new-product-form.html',
  styleUrl: './new-product-form.css',
})
export class NewProductForm {
  close = output<void>();
  save = output<Omit<AgnosticProductRecord, 'id'>>();

  sku = signal('');
  name = signal('');
  itemKind = signal<AgnosticItemKind>('Finished Good');
  category = signal('Bagged Ice (2kg / 5kg / Bulk)');
  unitOfMeasure = signal('Bag');
  standardCost = signal<number>(0);
  basePrice = signal<number>(0);
  status = signal<'Active' | 'Inactive'>('Active');
  notes = signal('');
  errorMessage = signal('');

  submitForm() {
    const cleanSku = this.sku().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanSku || !cleanName) {
      this.errorMessage.set('SKU / Code and Item Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
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