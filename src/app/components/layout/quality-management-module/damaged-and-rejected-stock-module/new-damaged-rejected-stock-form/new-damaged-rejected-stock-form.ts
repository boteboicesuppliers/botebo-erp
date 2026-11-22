import { Component, output, signal } from '@angular/core';
import {
  DamagedRejectedStockRecord,
  DispositionAction,
  RejectedItemKind,
} from '../damaged-and-rejected-stock-list-widget/damaged-and-rejected-stock-list-widget';

@Component({
  selector: 'app-new-damaged-rejected-stock-form',
  imports: [],
  templateUrl: './new-damaged-rejected-stock-form.html',
  styleUrl: './new-damaged-rejected-stock-form.css',
})
export class NewDamagedRejectedStockForm {
  close = output<void>();
  save = output<Omit<DamagedRejectedStockRecord, 'id'>>();

  referenceCode = signal('REJ-2026-017');
  itemName = signal('');
  itemKind = signal<RejectedItemKind>('Finished Good');
  batchOrLot = signal('');
  quantity = signal(1);
  unitOfMeasure = signal('Bags');
  reason = signal('');
  disposition = signal<DispositionAction>('Quarantine Hold');
  loggedDate = signal(new Date().toISOString().slice(0, 10));
  loggedBy = signal('');

  submit(): void {
    if (!this.itemName().trim() || !this.reason().trim()) return;
    this.save.emit({
      referenceCode: this.referenceCode().trim() || 'REJ-NEW',
      itemName: this.itemName().trim(),
      itemKind: this.itemKind(),
      batchOrLot: this.batchOrLot().trim() || 'UNSPECIFIED',
      quantity: Math.max(0, Number(this.quantity()) || 0),
      unitOfMeasure: this.unitOfMeasure().trim() || 'Units',
      reason: this.reason().trim(),
      disposition: this.disposition(),
      loggedDate: this.loggedDate(),
      loggedBy: this.loggedBy().trim() || 'QC Operator',
    });
  }
}