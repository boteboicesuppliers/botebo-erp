import { Component, input, output } from '@angular/core';
import { SupplierPriceRecord } from '../supplier-price-list-widget/supplier-price-list-widget';

@Component({
  selector: 'app-delete-rate-form',
  imports: [],
  templateUrl: './delete-rate-form.html',
  styleUrl: './delete-rate-form.css',
})
export class DeleteRateForm {
  priceEntry = input.required<SupplierPriceRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}