import { Component, input, output } from '@angular/core';
import { SupplierModel } from '../../../../models/suppliers/supplier-model';

@Component({
  selector: 'app-statement-form',
  imports: [],
  templateUrl: './statement-form.html',
  styleUrl: './statement-form.css',
})
export class StatementForm {
  suppliers = input.required<SupplierModel[]>();
  selected = input<SupplierModel | null>(null);
  closed = output<void>();
}