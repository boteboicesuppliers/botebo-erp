import { Component, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SUPPLIER_CURRENCIES,
  SUPPLIER_TYPES,
  SupplierModel,
  SupplierType,
} from '../../../../models/suppliers/supplier-model';
import { NewSupplierFormModel } from '../../../../models/suppliers/new-supplier-form-model';

@Component({
  selector: 'app-new-supplier-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-supplier-form.html',
  host: { '(document:keydown.escape)': 'close()' },
})
export class NewSupplierForm {
  private fb = inject(FormBuilder);

  // EVENTS
  closed = output<void>();
  saved = output<NewSupplierFormModel>();

  // STATE
  submitted = signal(false);
  kind = signal<'' | SupplierType>('');

  readonly supplierTypes: readonly string[] = SUPPLIER_TYPES;
  readonly currencies: readonly string[] = SUPPLIER_CURRENCIES;

  // FORM
  // Fields that only apply to one type of supplier start disabled (and are
  // excluded from validation) until that type is selected.
  form = this.fb.nonNullable.group({
    supplierType: ['', Validators.required],

    // Individual only
    firstName: [{ value: '', disabled: true }, Validators.required],
    lastName: [{ value: '', disabled: true }, Validators.required],

    // Business only
    businessName: [{ value: '', disabled: true }, Validators.required],

    // Both
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],

    // Key point of contact (business only)
    contactFirstName: [{ value: '', disabled: true }, Validators.required],
    contactLastName: [{ value: '', disabled: true }, Validators.required],
    contactEmail: [{ value: '', disabled: true }, [Validators.required, Validators.email]],

    // VAT (business only)
    vatStatus: [{ value: '', disabled: true }, Validators.required],
    vatNumber: [{ value: '', disabled: true }],

    // Credit (both)
    creditOption: ['', Validators.required],
    creditLimit: [{ value: '', disabled: true }],

    // Payment (both)
    paymentTerm: ['', Validators.required],
    paymentDays: [{ value: '', disabled: true }],
    currency: ['ZAR', Validators.required],

    // Banking + procurement (both)
    bankName: [''],
    bankAccountNumber: [''],
    branchCode: [''],
    leadTimeDays: ['', Validators.required],
  });

  // Same field look as the filter bar on the customer list (square, bevelled, 32px high)
  private readonly inputBase =
    'h-8 w-full border bg-white px-3 text-[13px] text-[#1f2933] shadow-[0_1px_2px_rgba(23,48,79,0.12)] outline-none transition-colors placeholder:text-[#6b7280] focus:ring-1 disabled:cursor-not-allowed disabled:border-[#cfd7e1] disabled:bg-[#e1e6ed] disabled:text-[#9ca3af] disabled:shadow-none';

  private readonly inputNormal =
    'border-t-[#c9d4e1] border-l-[#c9d4e1] border-b-[#9fb0c3] border-r-[#9fb0c3] focus:border-[#1b5a9a] focus:ring-[#1b5a9a]';

  private readonly inputInvalid =
    'border-t-red-500 border-l-red-500 border-b-red-600 border-r-red-600 focus:border-red-600 focus:ring-red-600';

  constructor() {
    const c = this.form.controls;

    const individualOnly = [c.firstName, c.lastName];
    const businessOnly = [
      c.businessName,
      c.contactFirstName,
      c.contactLastName,
      c.contactEmail,
      c.vatStatus,
    ];

    // Individual / Business decides which fields are active
    c.supplierType.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const kind = value === 'Individual' || value === 'Business' ? value : '';

      this.kind.set(kind);
      this.toggle(individualOnly, kind === 'Individual');
      this.toggle(businessOnly, kind === 'Business');

      if (kind !== 'Business') {
        c.vatNumber.clearValidators();
        c.vatNumber.reset('');
        c.vatNumber.disable();
      }
    });

    // VAT number is greyed out unless the business is VAT registered
    c.vatStatus.valueChanges.pipe(takeUntilDestroyed()).subscribe((status) => {
      if (status === 'registered') {
        c.vatNumber.setValidators(Validators.required);
        c.vatNumber.enable();
      } else {
        c.vatNumber.clearValidators();
        c.vatNumber.reset('');
        c.vatNumber.disable();
      }

      c.vatNumber.updateValueAndValidity();
    });

    // Credit limit field is only active when "Credit Limit" is selected
    c.creditOption.valueChanges.pipe(takeUntilDestroyed()).subscribe((option) => {
      if (option === 'limit') {
        c.creditLimit.setValidators(Validators.required);
        c.creditLimit.enable();
      } else {
        c.creditLimit.clearValidators();
        c.creditLimit.reset('');
        c.creditLimit.disable();
      }

      c.creditLimit.updateValueAndValidity();
    });

    // Days field is only active for a custom payment term
    c.paymentTerm.valueChanges.pipe(takeUntilDestroyed()).subscribe((term) => {
      if (term === 'custom') {
        c.paymentDays.setValidators([Validators.required, Validators.min(1)]);
        c.paymentDays.enable();
      } else {
        c.paymentDays.clearValidators();
        c.paymentDays.reset('');
        c.paymentDays.disable();
      }

      c.paymentDays.updateValueAndValidity();
    });
  }

  private toggle(controls: AbstractControl[], enabled: boolean): void {
    for (const control of controls) {
      if (enabled) {
        control.enable();
      } else {
        control.reset('');
        control.disable();
      }
    }
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

  onLeadTimeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 3);

    input.value = digits;
    this.form.controls.leadTimeDays.setValue(digits);
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

    const v = this.form.getRawValue();

    const isBusiness = v.supplierType === 'Business';
    const vatRegistered = isBusiness && v.vatStatus === 'registered';
    const hasCreditLimit = v.creditOption === 'limit';
    const isCustomTerm = v.paymentTerm === 'custom';

    this.saved.emit({
      supplierType: v.supplierType as SupplierType,
      name: isBusiness ? v.businessName.trim() : `${v.firstName.trim()} ${v.lastName.trim()}`,

      address: v.address.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),

      contactFirstName: isBusiness ? v.contactFirstName.trim() : '',
      contactLastName: isBusiness ? v.contactLastName.trim() : '',
      contactEmail: isBusiness ? v.contactEmail.trim() : '',

      vatRegistered,
      vatNumber: vatRegistered ? v.vatNumber.trim() : '',

      // 0 means no credit extended by this supplier
      creditLimit: hasCreditLimit ? Number(v.creditLimit.replace(/,/g, '')) : 0,

      paymentTerm: isCustomTerm ? 'Custom Term' : 'Cash on Delivery',
      paymentDays: isCustomTerm ? Number(v.paymentDays) : null,
      currency: v.currency as SupplierModel['currency'],

      bankName: v.bankName.trim(),
      bankAccountNumber: v.bankAccountNumber.trim(),
      branchCode: v.branchCode.trim(),
      leadTimeDays: Number(v.leadTimeDays),
    });
  }
}