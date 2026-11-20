import { Component, input, output } from '@angular/core';
import { FinishedGoodRecord } from '../finished-goods-list-widget/finished-goods-list-widget';

@Component({
  selector: 'app-delete-finished-good-form',
  imports: [],
  templateUrl: './delete-finished-good-form.html',
  styleUrl: './delete-finished-good-form.css',
})
export class DeleteFinishedGoodForm {
  product = input.required<FinishedGoodRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}