import { Component, input, output } from '@angular/core';
import { RawMaterialCheckRecord } from '../raw-materials-checks-list-widget/raw-materials-checks-list-widget';

@Component({
  selector: 'app-delete-raw-material-check-form',
  imports: [],
  templateUrl: './delete-raw-material-check-form.html',
  styleUrl: './delete-raw-material-check-form.css',
})
export class DeleteRawMaterialCheckForm {
  check = input.required<RawMaterialCheckRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}