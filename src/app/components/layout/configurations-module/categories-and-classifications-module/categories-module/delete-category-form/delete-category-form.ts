import { Component, input, output } from '@angular/core';
import { ProductCategoryRecord } from '../categories-list-widget/categories-list-widget';

@Component({
  selector: 'app-delete-category-form',
  imports: [],
  templateUrl: './delete-category-form.html',
  styleUrl: './delete-category-form.css',
})
export class DeleteCategoryForm {
  category = input.required<ProductCategoryRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}