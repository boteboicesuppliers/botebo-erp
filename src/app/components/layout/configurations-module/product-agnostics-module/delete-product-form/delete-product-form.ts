import { Component, input, output } from '@angular/core';
import { AgnosticProductRecord } from '../proprietary-products-list-widget/proprietary-products-list-widget';

@Component({
  selector: 'app-delete-product-form',
  imports: [],
  templateUrl: './delete-product-form.html',
  styleUrl: './delete-product-form.css',
})
export class DeleteProductForm {
  product = input.required<AgnosticProductRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}