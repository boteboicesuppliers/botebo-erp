import { Component, input, output } from '@angular/core';
import { BusinessClassificationRecord } from '../classifications-list-widget/classifications-list-widget';

@Component({
  selector: 'app-delete-classification-form',
  imports: [],
  templateUrl: './delete-classification-form.html',
  styleUrl: './delete-classification-form.css',
})
export class DeleteClassificationForm {
  classification = input.required<BusinessClassificationRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}