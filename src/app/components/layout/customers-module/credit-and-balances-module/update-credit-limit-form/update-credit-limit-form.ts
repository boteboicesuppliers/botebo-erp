import { Component, effect, input, output, signal } from '@angular/core';

export interface CreditLimitUpdatePayload {
  customerId: string;
  newCreditLimit: number;
  reason: string;
}

@Component({
  selector: 'app-update-credit-limit-form',
  imports: [],
  templateUrl: './update-credit-limit-form.html',
  styleUrl: './update-credit-limit-form.css',
})
export class UpdateCreditLimitForm {
  customerId = input.required<string>();
  customerCode = input.required<string>();
  customerName = input.required<string>();
  currentBalance = input.required<number>();
  currentCreditLimit = input.required<number>();

  saved = output<CreditLimitUpdatePayload>();
  cancelled = output<void>();

  limitInput = signal<string>('');
  reasonInput = signal<string>('');
  errorMessage = signal<string>('');

  constructor() {
    effect(() => {
      this.limitInput.set(String(this.currentCreditLimit()));
      this.reasonInput.set('');
      this.errorMessage.set('');
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const parsed = Number(this.limitInput());

    if (Number.isNaN(parsed) || parsed < 0) {
      this.errorMessage.set('Enter a valid credit limit of R0 or higher.');
      return;
    }

    this.errorMessage.set('');
    this.saved.emit({
      customerId: this.customerId(),
      newCreditLimit: parsed,
      reason: this.reasonInput().trim() || 'Credit limit adjustment',
    });
  }
}