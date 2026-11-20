import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinishedGoodRecord } from '../finished-goods-list-widget/finished-goods-list-widget';

@Component({
  selector: 'app-new-finished-good-form',
  imports: [FormsModule],
  templateUrl: './new-finished-good-form.html',
  styleUrl: './new-finished-good-form.css',
})
export class NewFinishedGoodForm {
  close = output<void>();
  save = output<Omit<FinishedGoodRecord, 'id'>>();

  sku = signal('');
  name = signal('');
  packSize = signal('2kg');
  category = signal('Bagged Ice');
  location = signal('Cold Room A - Bagged Ice');
  unitOfMeasure = signal('Bags');
  onHandQty = signal<number>(0);
  reservedQty = signal<number>(0);
  reorderPoint = signal<number>(200);
  unitCost = signal<number>(0);
  unitPrice = signal<number>(0);
  active = signal<boolean>(true);
  errorMessage = signal('');

  submitForm() {
    const cleanSku = this.sku().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanSku || !cleanName) {
      this.errorMessage.set('SKU and Product Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
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