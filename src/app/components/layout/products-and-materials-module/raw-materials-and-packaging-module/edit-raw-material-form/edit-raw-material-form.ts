import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MaterialCategoryType,
  RawMaterialRecord,
} from '../raw-materials-and-packaging-list-widget/raw-materials-and-packaging-list-widget';

@Component({
  selector: 'app-edit-raw-material-form',
  imports: [FormsModule],
  templateUrl: './edit-raw-material-form.html',
  styleUrl: './edit-raw-material-form.css',
})
export class EditRawMaterialForm {
  material = input.required<RawMaterialRecord>();
  close = output<void>();
  save = output<RawMaterialRecord>();

  sku = signal('');
  name = signal('');
  materialType = signal<MaterialCategoryType>('Packaging');
  unitOfMeasure = signal('Units');
  stockOnHand = signal<number>(0);
  reorderLevel = signal<number>(0);
  unitCost = signal<number>(0);
  preferredSupplier = signal('');
  leadTimeDays = signal<number>(1);
  active = signal<boolean>(true);
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const m = this.material();
      this.sku.set(m.sku);
      this.name.set(m.name);
      this.materialType.set(m.materialType);
      this.unitOfMeasure.set(m.unitOfMeasure);
      this.stockOnHand.set(m.stockOnHand);
      this.reorderLevel.set(m.reorderLevel);
      this.unitCost.set(m.unitCost);
      this.preferredSupplier.set(m.preferredSupplier);
      this.leadTimeDays.set(m.leadTimeDays);
      this.active.set(m.active);
    });
  }

  submitForm() {
    const cleanSku = this.sku().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanSku || !cleanName) {
      this.errorMessage.set('SKU and Item Name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.material().id,
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