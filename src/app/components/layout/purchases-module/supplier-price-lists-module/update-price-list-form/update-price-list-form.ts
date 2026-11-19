import { Component, output, signal } from '@angular/core';
import {
  PriceTier,
  SupplierPriceRecord,
} from '../supplier-price-list-widget/supplier-price-list-widget';

@Component({
  selector: 'app-update-price-list-form',
  imports: [],
  templateUrl: './update-price-list-form.html',
  styleUrl: './update-price-list-form.css',
})
export class UpdatePriceListForm {
  close = output<void>();
  save = output<Omit<SupplierPriceRecord, 'id' | 'currentPrice'>>();

  supplier = signal('');
  item = signal('');
  unitRate = signal<number | null>(null);
  effectiveDate = signal('2026-11-19');
  tier = signal<PriceTier>('Contract Tier 1');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (
      !this.supplier().trim() ||
      !this.item().trim() ||
      !this.unitRate() ||
      this.unitRate()! <= 0
    ) {
      return;
    }

    this.save.emit({
      supplier: this.supplier().trim(),
      item: this.item().trim(),
      unitRate: Number(this.unitRate()),
      effectiveDate: this.effectiveDate(),
      tier: this.tier(),
    });
  }
}