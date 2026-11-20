import { Component, input, output } from '@angular/core';
import { RawMaterialRecord } from '../raw-materials-and-packaging-list-widget/raw-materials-and-packaging-list-widget';

@Component({
  selector: 'app-delete-raw-material-form',
  imports: [],
  templateUrl: './delete-raw-material-form.html',
  styleUrl: './delete-raw-material-form.css',
})
export class DeleteRawMaterialForm {
  material = input.required<RawMaterialRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}