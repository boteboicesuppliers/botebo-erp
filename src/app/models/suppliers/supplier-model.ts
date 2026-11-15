import { PaymentTerm } from '../contracts/customer-model';

export type SupplierKind = 'Individual' | 'Business';

export type SupplierType = 'Manufacturer' | 'Distributor';

export interface SupplierModel {
  id: string;

  // Individual / Business
  supplierKind: SupplierKind;

  // Individual only (empty for a business)
  firstName: string;
  lastName: string;

  // Business only (empty for an individual)
  businessName: string;

  // Both
  address: string;
  email: string; // Business email for a business, Email for an individual
  phone: string; // Business phone for a business, Phone for an individual
  supplierType: SupplierType;

  // Key contact (business only, empty for an individual)
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;

  // VAT (business only, false/empty for an individual)
  vatRegistered: boolean;
  vatNumber: string;

  // Credit (both)
  hasCreditLimit: boolean;
  creditLimit: number | null; // null when there is no credit limit

  // Payment (both)
  paymentTerm: PaymentTerm;
  paymentDays: number | null; // null for Cash on Delivery
}