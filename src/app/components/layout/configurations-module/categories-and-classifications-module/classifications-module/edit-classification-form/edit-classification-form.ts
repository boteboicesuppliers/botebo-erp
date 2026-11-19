import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusinessClassificationRecord } from '../classifications-list-widget/classifications-list-widget';

@Component({
  selector: 'app-edit-classification-form',
  imports: [FormsModule],
  templateUrl: './edit-classification-form.html',
  styleUrl: './edit-classification-form.css',
})
export class EditClassificationForm {
  classification = input.required<BusinessClassificationRecord>();
  close = output<void>();
  save = output<BusinessClassificationRecord>();

  code = signal('');
  name = signal('');
  classificationType = signal<'Business Unit' | 'Production Department'>('Business Unit');
  productionDepartment = signal('');
  businessUnit = signal('');
  status = signal<'Active' | 'Inactive'>('Active');
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const item = this.classification();
      this.code.set(item.code);
      this.name.set(item.name);
      this.classificationType.set(item.classificationType);
      this.productionDepartment.set(item.productionDepartment);
      this.businessUnit.set(item.businessUnit);
      this.status.set(item.status);
    });
  }

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanCode || !cleanName) {
      this.errorMessage.set('Classification code and name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.classification().id,
      code: cleanCode,
      name: cleanName,
      classificationType: this.classificationType(),
      productionDepartment: this.productionDepartment().trim() || 'General Production',
      businessUnit: this.businessUnit().trim() || 'Botebo Ice Suppliers',
      status: this.status(),
    });
  }
}