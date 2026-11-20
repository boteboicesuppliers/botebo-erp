import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockCountItemRecord } from '../current-stock-count-widget/current-stock-count-widget';

export interface UpdatedStockCountPayload {
  id: string;
  countedQty: number;
  countedBy: string;
  notes?: string;
}

@Component({
  selector: 'app-update-stock-count-form',
  imports: [FormsModule],
  templateUrl: './update-stock-count-form.html',
  styleUrl: './update-stock-count-form.css',
})
export class UpdateStockCountForm {
  item = input.required<StockCountItemRecord>();
  close = output<void>();
  save = output<UpdatedStockCountPayload>();

  countedQty = signal<number>(0);
  countedBy = signal<string>('');
  notes = signal<string>('');
  errorMessage = signal<string>('');

  variance = computed(() => {
    const qty = Number(this.countedQty());
    if (Number.isNaN(qty)) return 0;
    return qty - this.item().systemQty;
  });

  constructor() {
    effect(() => {
      const current = this.item();
      this.countedQty.set(current.countedQty ?? current.systemQty);
      this.countedBy.set(current.countedBy !== '—' ? current.countedBy : '');
      this.notes.set('');
      this.errorMessage.set('');
    });
  }

  submitForm() {
    const qty = Number(this.countedQty());
    const counter = this.countedBy().trim();

    if (Number.isNaN(qty) || qty < 0) {
      this.errorMessage.set('Counted quantity must be a valid non-negative number.');
      return;
    }

    if (!counter) {
      this.errorMessage.set('Please enter who performed the physical count.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.item().id,
      countedQty: qty,
      countedBy: counter,
      notes: this.notes().trim() || undefined,
    });
  }
}