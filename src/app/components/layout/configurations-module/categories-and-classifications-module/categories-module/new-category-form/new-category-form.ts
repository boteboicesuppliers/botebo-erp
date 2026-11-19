import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCategoryRecord } from '../categories-list-widget/categories-list-widget';

@Component({
  selector: 'app-new-category-form',
  imports: [FormsModule],
  templateUrl: './new-category-form.html',
  styleUrl: './new-category-form.css',
})
export class NewCategoryForm {
  close = output<void>();
  save = output<Omit<ProductCategoryRecord, 'id'>>();

  code = signal('');
  name = signal('');
  productionDepartment = signal('Bagging, Palletizing & Cold Storage');
  businessUnit = signal('Botebo Ice Suppliers');
  glAccountMapping = signal('4000 - Ice Sales Revenue');
  status = signal<'Active' | 'Inactive'>('Active');
  description = signal('');
  errorMessage = signal('');

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanCode || !cleanName) {
      this.errorMessage.set('Category code and name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      code: cleanCode,
      name: cleanName,
      productionDepartment: this.productionDepartment().trim() || 'General Production',
      businessUnit: this.businessUnit().trim() || 'Botebo Ice Suppliers',
      glAccountMapping: this.glAccountMapping().trim() || '4000 - Ice Sales Revenue',
      status: this.status(),
      description: this.description().trim(),
    });
  }
}