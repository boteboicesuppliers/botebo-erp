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

  private readonly inputBase =
    'w-full rounded-lg border bg-slate-100 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-600 focus:bg-white focus:ring-2 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder:text-slate-400';

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
    return (
      this.inputBase +
      (this.hasError(name)
        ? ' border-red-500 focus:border-red-500 focus:ring-red-100'
        : ' border-slate-500 focus:border-blue-600 focus:ring-blue-200')
    );
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