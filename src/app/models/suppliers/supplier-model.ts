// src/app/models/suppliers/supplier-model.ts

export type SupplierStatus =
  | 'Approved'
  | 'Pending Approval'
  | 'Inactive'
  | 'On Hold'
  | 'Disqualified';

export const SUPPLIER_STATUSES: SupplierStatus[] = [
  'Approved',
  'Pending Approval',
  'Inactive',
  'On Hold',
  'Disqualified',
];

export type SupplierType = 'Business' | 'Individual';

export type PaymentTerm = 'Cash on Delivery' | 'Custom Term';

export interface SupplierModel {
  id: string;
  supplierType: SupplierType;

  // Business name for Business suppliers, "First Last" for Individual suppliers
  name: string;
  address: string;

  // Business email/phone for Business suppliers, personal email/phone for Individual suppliers
  email: string;
  phone: string;

  // Key point of contact (empty strings for Individual suppliers)
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;

  // Tax (VAT number is only relevant when registered)
  vatRegistered: boolean;
  vatNumber: string;

  // Credit & payment
  creditLimit: number;
  paymentTerm: PaymentTerm;
  paymentDays: number | null;

  // Procurement additions
  currency: string; // ZAR, USD, EUR ...
  bankName: string;
  bankAccountNumber: string;
  branchCode: string;
  leadTimeDays: number;

  // Optional so existing forms that build a supplier field by field still compile.
  // The supplier list always fills it in (defaults to 'Pending Approval').
  status?: SupplierStatus;
}

// What the "new supplier" form emits (id + status are assigned by the list widget)
export type NewSupplierFormModel = Omit<SupplierModel, 'id' | 'status'>;

// Shared option lists (used by the supplier forms)
export const SUPPLIER_TYPES: SupplierType[] = ['Business', 'Individual'];

export const SUPPLIER_CURRENCIES: string[] = ['ZAR', 'USD', 'EUR', 'GBP'];