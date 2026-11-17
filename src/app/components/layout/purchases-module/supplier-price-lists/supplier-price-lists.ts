import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-supplier-price-lists',
  imports: [],
  templateUrl: './supplier-price-lists.html',
  styleUrl: './supplier-price-lists.css',
})
export class SupplierPriceLists {
  prices = signal([
    { supplier: 'Gauteng Chemical Supplies', item: 'Ammonia Refrigerant (per kg)', currentPrice: 'R 85.00', effectiveDate: '2026-10-01', tier: 'Contract Tier 1' },
    { supplier: 'Mpumalanga Packaging Corp', item: 'LDPE Film Roll (per unit)', currentPrice: 'R 340.00', effectiveDate: '2026-11-01', tier: 'Wholesale Volume' },
  ]);
}