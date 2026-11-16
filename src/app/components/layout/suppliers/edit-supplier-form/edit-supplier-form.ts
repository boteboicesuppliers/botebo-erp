import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SUPPLIER_CURRENCIES,
  SUPPLIER_TYPES,
  SupplierModel,
  SupplierType,
} from '../../../../models/suppliers/supplier-model';

const CURRENCY_SYMBOL: Record<string, string> = {
  ZAR: 'R',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

type DigitsField = 'paymentDays' | 'leadTimeDays' | 'bankAccountNumber' | 'branchCode';

@Component({
  selector: 'app-edit-supplier-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-supplier-form.html',
  host: { '(document:keydown.escape)': 'close()' },
})
export class EditSupplierForm implements OnInit {
  private fb = inject(FormBuilder);

  // INPUT: the supplier being edited
  supplier = input.required<SupplierModel>();

  // EVENTS
  closed = output<void>();
  saved = output<SupplierModel>();

  // STATE
  submitted = signal(false);

  supplierTypes = SUPPLIER_TYPES;
  currencies = SUPPLIER_CURRENCIES;

  // FORM
  form = this.fb.nonNullable.group({
    supplierType: ['', Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.email],
    phone: [''],
    contactFirstName: ['', Validators.required],
    contactLastName: ['', Validators.required],
    contactEmail: ['', [Validators.required, Validators.email]],
    vatStatus: ['', Validators.required],
    vatNumber: [{ value: '', disabled: true }],
    currency: ['', Validators.required],
    creditLimit: ['', Validators.required],
    paymentTerm: ['', Validators.required],
    paymentDays: [{ value: '', disabled: true }],
    bankName: ['', Validators.required],
    bankAccountNumber: ['', Validators.required],
    branchCode: ['', Validators.required],
    leadTimeDays: ['', [Validators.required, Validators.min(1)]],
  });

  // Same field look as the filter bar on the supplier list (square, bevelled, 32px high)
  private readonly inputBase =
    'h-8 w-full border bg-white px-3 text-[13px] text-[#1f2933] shadow-[0_1px_2px_rgba(23,48,79,0.12)] outline-none transition-colors placeholder:text-[#6b7280] focus:ring-1 disabled:cursor-not-allowed disabled:border-[#cfd7e1] disabled:bg-[#e1e6ed] disabled:text-[#9ca3af] disabled:shadow-none';

  private readonly inputNormal =
    'border-t-[#c9d4e1] border-l-[#c9d4e1] border-b-[#9fb0c3] border-r-[#9fb0c3] focus:border-[#1b5a9a] focus:ring-[#1b5a9a]';

  private readonly inputInvalid =
    'border-t-red-500 border-l-red-500 border-b-red-600 border-r-red-600 focus:border-red-600 focus:ring-red-600';

  constructor() {
    // Business vs Individual: individuals have no key contact and no VAT entity,
    // and their own email/phone are required (they are the only way to reach them)
    this.form.controls.supplierType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((type) => this.applySupplierType(type));

    // VAT number is greyed out unless the supplier is VAT registered
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

  ngOnInit(): void {
    const s = this.supplier();

    // Supplier type first (this enables/disables the contact + VAT controls)
    this.form.controls.supplierType.setValue(s.supplierType);

    // Plain fields
    this.form.patchValue({
      name: s.name,
      address: s.address,
      email: s.email,
      phone: s.phone,
      contactFirstName: s.contactFirstName,
      contactLastName: s.contactLastName,
      contactEmail: s.contactEmail,
      currency: s.currency,
      creditLimit: s.creditLimit.toLocaleString('en-US'),
      bankName: s.bankName,
      bankAccountNumber: s.bankAccountNumber,
      branchCode: s.branchCode,
      leadTimeDays: String(s.leadTimeDays),
    });

    // VAT (business only): set the status first (this enables/disables the VAT number), then the number
    if (s.supplierType === 'Business') {
      this.form.controls.vatStatus.setValue(s.vatRegistered ? 'registered' : 'not-registered');
      if (s.vatRegistered) {
        this.form.controls.vatNumber.setValue(s.vatNumber);
      }
    }

    // Payment: set the term first (this enables/disables the days), then the days
    this.form.controls.paymentTerm.setValue(s.paymentTerm === 'Cash on Delivery' ? 'cod' : 'custom');
    if (s.paymentTerm === 'Custom Term') {
      this.form.controls.paymentDays.setValue(String(s.paymentDays ?? ''));
    }
  }

  // TYPE-DEPENDENT FIELDS

  isIndividual(): boolean {
    return this.form.controls.supplierType.value === 'Individual';
  }

  currencySymbol(): string {
    const code = this.form.controls.currency.value;

    return CURRENCY_SYMBOL[code] ?? (code || 'R');
  }

  private applySupplierType(type: string): void {
    const c = this.form.controls;
    const contact = [c.contactFirstName, c.contactLastName, c.contactEmail];

    if (type === 'Individual') {
      contact.forEach((control) => {
        control.clearValidators();
        control.reset('');
        control.disable();
      });

      c.email.setValidators([Validators.required, Validators.email]);
      c.phone.setValidators(Validators.required);

      c.vatStatus.setValue('not-registered');
      c.vatStatus.disable();
    } else {
      c.contactFirstName.setValidators(Validators.required);
      c.contactLastName.setValidators(Validators.required);
      c.contactEmail.setValidators([Validators.required, Validators.email]);
      contact.forEach((control) => control.enable());

      c.email.setValidators(Validators.email);
      c.phone.clearValidators();

      c.vatStatus.enable();
    }

    [c.email, c.phone, ...contact].forEach((control) => control.updateValueAndValidity());
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

  // Digits only, capped at a maximum length (payment days, lead time, account number, branch code)
  onDigitsInput(event: Event, field: DigitsField, max: number): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, max);

    input.value = digits;
    this.form.controls[field].setValue(digits);
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
    const individual = value.supplierType === 'Individual';
    const vatRegistered = !individual && value.vatStatus === 'registered';

    this.saved.emit({
      id: this.supplier().id,
      status: this.supplier().status,
      supplierType: value.supplierType as SupplierType,
      name: value.name.trim(),
      address: value.address.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
      contactFirstName: individual ? '' : value.contactFirstName.trim(),
      contactLastName: individual ? '' : value.contactLastName.trim(),
      contactEmail: individual ? '' : value.contactEmail.trim(),
      vatRegistered,
      vatNumber: vatRegistered ? value.vatNumber.trim() : '',
      creditLimit: Number(value.creditLimit.replace(/,/g, '')),
      paymentTerm: value.paymentTerm === 'cod' ? 'Cash on Delivery' : 'Custom Term',
      paymentDays: value.paymentTerm === 'custom' ? Number(value.paymentDays) : null,
      currency: value.currency,
      bankName: value.bankName.trim(),
      bankAccountNumber: value.bankAccountNumber.trim(),
      branchCode: value.branchCode.trim(),
      leadTimeDays: Number(value.leadTimeDays),
    });
  }
}