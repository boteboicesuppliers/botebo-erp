import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusinessClassificationRecord } from '../classifications-list-widget/classifications-list-widget';

@Component({
  selector: 'app-new-classification-form',
  imports: [FormsModule],
  templateUrl: './new-classification-form.html',
  styleUrl: './new-classification-form.css',
})
export class NewClassificationForm {
  close = output<void>();
  save = output<Omit<BusinessClassificationRecord, 'id'>>();

  code = signal('');
  name = signal('');
  classificationType = signal<'Business Unit' | 'Production Department'>('Business Unit');
  productionDepartment = signal('Ice Freezing & Chiller Plant');
  businessUnit = signal('Botebo Ice Suppliers');
  status = signal<'Active' | 'Inactive'>('Active');
  errorMessage = signal('');

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanCode || !cleanName) {
      this.errorMessage.set('Classification code and name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      code: cleanCode,
      name: cleanName,
      classificationType: this.classificationType(),
      productionDepartment: this.productionDepartment().trim() || 'General Production',
      businessUnit: this.businessUnit().trim() || 'Botebo Ice Suppliers',
      status: this.status(),
    });
  }
}