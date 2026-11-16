import { Component, ElementRef, afterNextRender, computed, input, output, signal, viewChild } from '@angular/core';
import { SupplierModel } from '../../../../models/suppliers/supplier-model';

@Component({
  selector: 'app-delete-supplier-form',
  templateUrl: './delete-supplier-form.html',
})
export class DeleteSupplierForm {
  supplier = input.required<SupplierModel>();
  closed = output<void>();
  confirmed = output<void>();

  typedName = signal('');
  nameMatches = computed(() => this.typedName().trim() === this.supplier().name.trim());

  private nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  constructor() {
    afterNextRender(() => this.nameInput()?.nativeElement.focus());
  }

  confirm(): void {
    if (this.nameMatches()) {
      this.confirmed.emit();
    }
  }
}