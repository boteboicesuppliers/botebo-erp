import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinishedGoodRecord } from '../finished-goods-list-widget/finished-goods-list-widget';

@Component({
  selector: 'app-edit-finished-good-form',
  imports: [FormsModule],
  templateUrl: './edit-finished-good-form.html',
  styleUrl: './edit-finished-good-form.css',
})
export class EditFinishedGoodForm {
  product = input.required<FinishedGoodRecord>();
  close = output<void>();
  save = output<FinishedGoodRecord>();

  sku = signal('');
  name = signal('');
  packSize = signal('');
  category = signal('');
  location = signal('');
  unitOfMeasure = signal('Bags');
  onHandQty = signal<number>(0);
  reservedQty = signal<number>(0);
  reorderPoint = signal<number>(0);
  unitCost = signal<number>(0);
  unitPrice = signal<number>(0);
  active = signal<boolean>(true);
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const p = this.product();
      this.sku.set(p.sku);
      this.name.set(p.name);
      this.packSize.set(p.packSize);
      this.category.set(p.category);
      this.location.set(p.location);
      this.unitOfMeasure.set(p.unitOfMeasure);
      this.onHandQty.set(p.onHandQty);
      this.reservedQty.set(p.reservedQty);
      this.reorderPoint.set(p.reorderPoint);
      this.unitCost.set(p.unitCost);
      this.unitPrice.set(p.unitPrice);
      this.active.set(p.active);
    });
  }

  submitForm() {
    const cleanSku = this.sku().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanSku || !cleanName) {
      this.errorMessage.set('SKU and Product Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.product().id,
      sku: cleanSku,
      name: cleanName,
      packSize: this.packSize().trim() || 'Standard',
      category: this.category().trim() || 'Bagged Ice',
      location: this.location().trim() || 'Cold Room A - Bagged Ice',
      unitOfMeasure: this.unitOfMeasure().trim() || 'Bags',
      onHandQty: Math.max(0, Number(this.onHandQty()) || 0),
      reservedQty: Math.max(0, Number(this.reservedQty()) || 0),
      reorderPoint: Math.max(0, Number(this.reorderPoint()) || 0),
      unitCost: Math.max(0, Number(this.unitCost()) || 0),
      unitPrice: Math.max(0, Number(this.unitPrice()) || 0),
      active: this.active(),
    });
  }
}