import { Component, effect, input, output, signal } from '@angular/core';
import {
  PriceTier,
  SupplierPriceRecord,
} from '../supplier-price-list-widget/supplier-price-list-widget';

@Component({
  selector: 'app-edit-rate-form',
  imports: [],
  templateUrl: './edit-rate-form.html',
  styleUrl: './edit-rate-form.css',
})
export class EditRateForm {
  priceEntry = input.required<SupplierPriceRecord>();
  close = output<void>();
  save = output<SupplierPriceRecord>();

  supplier = signal('');
  item = signal('');
  unitRate = signal<number>(0);
  effectiveDate = signal('');
  tier = signal<PriceTier>('Contract Tier 1');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.priceEntry();
      this.supplier.set(current.supplier);
      this.item.set(current.item);
      this.unitRate.set(current.unitRate);
      this.effectiveDate.set(current.effectiveDate);
      this.tier.set(current.tier);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.supplier().trim() || !this.item().trim() || this.unitRate() <= 0) {
      return;
    }

    const current = this.priceEntry();
    const rate = Number(this.unitRate());
    this.save.emit({
      ...current,
      supplier: this.supplier().trim(),
      item: this.item().trim(),
      unitRate: rate,
      currentPrice: 'R ' + rate.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      effectiveDate: this.effectiveDate(),
      tier: this.tier(),
    });
  }
}