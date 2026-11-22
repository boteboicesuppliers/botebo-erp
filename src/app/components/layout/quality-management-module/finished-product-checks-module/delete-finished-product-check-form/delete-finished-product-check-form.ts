import { Component, input, output } from '@angular/core';
import { FinishedProductCheckRecord } from '../finished-product-checks-list-widget/finished-product-checks-list-widget';

@Component({
  selector: 'app-delete-finished-product-check-form',
  imports: [],
  templateUrl: './delete-finished-product-check-form.html',
  styleUrl: './delete-finished-product-check-form.css',
})
export class DeleteFinishedProductCheckForm {
  check = input.required<FinishedProductCheckRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}