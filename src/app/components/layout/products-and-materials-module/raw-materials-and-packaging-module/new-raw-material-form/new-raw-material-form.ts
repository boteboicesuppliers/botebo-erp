import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MaterialCategoryType,
  RawMaterialRecord,
} from '../raw-materials-and-packaging-list-widget/raw-materials-and-packaging-list-widget';

@Component({
  selector: 'app-new-raw-material-form',
  imports: [FormsModule],
  templateUrl: './new-raw-material-form.html',
  styleUrl: './new-raw-material-form.css',
})
export class NewRawMaterialForm {
  close = output<void>();
  save = output<Omit<RawMaterialRecord, 'id'>>();

  sku = signal('');
  name = signal('');
  materialType = signal<MaterialCategoryType>('Packaging');
  unitOfMeasure = signal('Rolls');
  stockOnHand = signal<number>(0);
  reorderLevel = signal<number>(10);
  unitCost = signal<number>(0);
  preferredSupplier = signal('');
  leadTimeDays = signal<number>(3);
  active = signal<boolean>(true);
  errorMessage = signal('');

  submitForm() {
    const cleanSku = this.sku().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanSku || !cleanName) {
      this.errorMessage.set('SKU and Item Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      sku: cleanSku,
      name: cleanName,
      materialType: this.materialType(),
      unitOfMeasure: this.unitOfMeasure().trim() || 'Units',
      stockOnHand: Math.max(0, Number(this.stockOnHand()) || 0),
      reorderLevel: Math.max(0, Number(this.reorderLevel()) || 0),
      unitCost: Math.max(0, Number(this.unitCost()) || 0),
      preferredSupplier: this.preferredSupplier().trim() || 'Unassigned Supplier',
      leadTimeDays: Math.max(1, Number(this.leadTimeDays()) || 1),
      active: this.active(),
    });
  }
}