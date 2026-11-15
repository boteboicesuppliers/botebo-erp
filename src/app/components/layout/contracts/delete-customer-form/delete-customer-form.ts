import { Component, ElementRef, afterNextRender, computed, input, output, signal, viewChild } from '@angular/core';
import { CustomerModel } from '../../../../models/contracts/customer-model';

@Component({
  selector: 'app-delete-customer-form',
  templateUrl: './delete-customer-form.html',
})
export class DeleteCustomerForm {
  customer = input.required<CustomerModel>();
  closed = output<void>();
  confirmed = output<void>();

  typedName = signal('');
  nameMatches = computed(() => this.typedName().trim() === this.customer().businessName.trim());

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