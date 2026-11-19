import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCategoryRecord } from '../categories-list-widget/categories-list-widget';

@Component({
  selector: 'app-edit-category-form',
  imports: [FormsModule],
  templateUrl: './edit-category-form.html',
  styleUrl: './edit-category-form.css',
})
export class EditCategoryForm {
  category = input.required<ProductCategoryRecord>();
  close = output<void>();
  save = output<ProductCategoryRecord>();

  code = signal('');
  name = signal('');
  productionDepartment = signal('');
  businessUnit = signal('');
  glAccountMapping = signal('');
  status = signal<'Active' | 'Inactive'>('Active');
  description = signal('');
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const item = this.category();
      this.code.set(item.code);
      this.name.set(item.name);
      this.productionDepartment.set(item.productionDepartment);
      this.businessUnit.set(item.businessUnit);
      this.glAccountMapping.set(item.glAccountMapping);
      this.status.set(item.status);
      this.description.set(item.description);
    });
  }

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanCode || !cleanName) {
      this.errorMessage.set('Category code and name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.category().id,
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