import { Component, effect, input, output, signal } from '@angular/core';
import {
  DamagedRejectedStockRecord,
  DispositionAction,
  RejectedItemKind,
} from '../damaged-and-rejected-stock-list-widget/damaged-and-rejected-stock-list-widget';

@Component({
  selector: 'app-edit-damaged-rejected-stock-form',
  imports: [],
  templateUrl: './edit-damaged-rejected-stock-form.html',
  styleUrl: './edit-damaged-rejected-stock-form.css',
})
export class EditDamagedRejectedStockForm {
  record = input.required<DamagedRejectedStockRecord>();
  close = output<void>();
  save = output<DamagedRejectedStockRecord>();

  referenceCode = signal('');
  itemName = signal('');
  itemKind = signal<RejectedItemKind>('Finished Good');
  batchOrLot = signal('');
  quantity = signal(0);
  unitOfMeasure = signal('Bags');
  reason = signal('');
  disposition = signal<DispositionAction>('Quarantine Hold');
  loggedDate = signal('');
  loggedBy = signal('');

  constructor() {
    effect(() => {
      const r = this.record();
      this.referenceCode.set(r.referenceCode);
      this.itemName.set(r.itemName);
      this.itemKind.set(r.itemKind);
      this.batchOrLot.set(r.batchOrLot);
      this.quantity.set(r.quantity);
      this.unitOfMeasure.set(r.unitOfMeasure);
      this.reason.set(r.reason);
      this.disposition.set(r.disposition);
      this.loggedDate.set(r.loggedDate);
      this.loggedBy.set(r.loggedBy);
    });
  }

  submit(): void {
    if (!this.itemName().trim() || !this.reason().trim()) return;
    this.save.emit({
      id: this.record().id,
      referenceCode: this.referenceCode().trim(),
      itemName: this.itemName().trim(),
      itemKind: this.itemKind(),
      batchOrLot: this.batchOrLot().trim(),
      quantity: Math.max(0, Number(this.quantity()) || 0),
      unitOfMeasure: this.unitOfMeasure().trim(),
      reason: this.reason().trim(),
      disposition: this.disposition(),
      loggedDate: this.loggedDate(),
      loggedBy: this.loggedBy().trim(),
    });
  }
}