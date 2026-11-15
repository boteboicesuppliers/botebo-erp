import { Component, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerType } from '../../../../models/contracts/customer-model';
import { NewCustomerFormModel } from '../../../../models/contracts/new-customer-form-model';

@Component({
  selector: 'app-new-customer-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer-form.html',
  host: { '(document:keydown.escape)': 'close()' },
})
export class NewCustomerForm {
  private fb = inject(FormBuilder);

  // EVENTS
  closed = output<void>();
  saved = output<NewCustomerFormModel>();

  // STATE
  submitted = signal(false);

  customerTypes: CustomerType[] = ['Retail/Forecourt', 'Food & Beverage', 'Reseller'];

  // FORM
  form = this.fb.nonNullable.group({
    businessName: ['', Validators.required],
    contactFirstName: ['', Validators.required],
    contactLastName: ['', Validators.required],
    contactEmail: ['', [Validators.required, Validators.email]],
    contactPhone: ['', Validators.required],
    address: ['', Validators.required],
    vatStatus: ['', Validators.required],
    vatNumber: [{ value: '', disabled: true }],
    businessEmail: ['', Validators.email],
    businessPhone: [''],
    customerType: ['', Validators.required],
    creditLimit: ['', Validators.required],
    paymentTerm: ['', Validators.required],
    paymentDays: [{ value: '', disabled: true }],
  });

  // Same field look as the filter bar on the customer list (square, bevelled, 32px high)
  private readonly inputBase =
    'h-8 w-full border bg-white px-3 text-[13px] text-[#1f2933] shadow-[0_1px_2px_rgba(23,48,79,0.12)] outline-none transition-colors placeholder:text-[#6b7280] focus:ring-1 disabled:cursor-not-allowed disabled:border-[#cfd7e1] disabled:bg-[#e1e6ed] disabled:text-[#9ca3af] disabled:shadow-none';

  private readonly inputNormal =
    'border-t-[#c9d4e1] border-l-[#c9d4e1] border-b-[#9fb0c3] border-r-[#9fb0c3] focus:border-[#1b5a9a] focus:ring-[#1b5a9a]';

  private readonly inputInvalid =
    'border-t-red-500 border-l-red-500 border-b-red-600 border-r-red-600 focus:border-red-600 focus:ring-red-600';

  constructor() {
    // VAT number is greyed out unless the business is VAT registered
    this.form.controls.vatStatus.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((status) => {
        const vatNumber = this.form.controls.vatNumber;

        if (status === 'registered') {
          vatNumber.setValidators(Validators.required);
          vatNumber.enable();
        } else {
          vatNumber.clearValidators();
          vatNumber.reset('');
          vatNumber.disable();
        }

        vatNumber.updateValueAndValidity();
      });

    // Days field is only active for a custom payment term
    this.form.controls.paymentTerm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((term) => {
        const days = this.form.controls.paymentDays;

        if (term === 'custom') {
          days.setValidators([Validators.required, Validators.min(1)]);
          days.enable();
        } else {
          days.clearValidators();
          days.reset('');
          days.disable();
        }

        days.updateValueAndValidity();
      });
  }

  // INPUT HANDLERS

  onCreditLimitInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const caret = input.selectionStart ?? input.value.length;
    const digitsBeforeCaret = input.value.slice(0, caret).replace(/\D/g, '').length;

    const digits = input.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 12);
    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    input.value = formatted;
    this.form.controls.creditLimit.setValue(formatted);

    // Keep the cursor where the user was typing
    let position = 0;
    let counted = 0;
    while (position < formatted.length && counted < digitsBeforeCaret) {
      if (/\d/.test(formatted[position])) {
        counted++;
      }
      position++;
    }
    input.setSelectionRange(position, position);
  }

  onDaysInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 3);

    input.value = digits;
    this.form.controls.paymentDays.setValue(digits);
  }

  selectPaymentTerm(term: 'cod' | 'custom', event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const control = this.form.controls.paymentTerm;

    control.setValue(checked ? term : '');
    control.markAsTouched();
  }

  // VALIDATION HELPERS

  hasError(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  errorMessage(name: string): string {
    const control = this.form.get(name);

    if (control?.hasError('email')) {
      return 'Enter a valid email address';
    }

    if (control?.hasError('min')) {
      return 'Enter 1 day or more';
    }

    return 'This field is required';
  }

  inputClass(name: string): string {
    return `${this.inputBase} ${this.hasError(name) ? this.inputInvalid : this.inputNormal}`;
  }

  // ACTIONS

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.saved.emit({
      businessName: value.businessName.trim(),
      contactFirstName: value.contactFirstName.trim(),
      contactLastName: value.contactLastName.trim(),
      contactEmail: value.contactEmail.trim(),
      contactPhone: value.contactPhone.trim(),
      address: value.address.trim(),
      vatRegistered: value.vatStatus === 'registered',
      vatNumber: value.vatNumber.trim(),
      businessEmail: value.businessEmail.trim(),
      businessPhone: value.businessPhone.trim(),
      customerType: value.customerType as CustomerType,
      creditLimit: Number(value.creditLimit.replace(/,/g, '')),
      paymentTerm: value.paymentTerm === 'cod' ? 'Cash on Delivery' : 'Custom Term',
      paymentDays: value.paymentTerm === 'custom' ? Number(value.paymentDays) : null,
    });
  }
}