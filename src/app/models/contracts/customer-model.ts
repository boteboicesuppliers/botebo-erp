export type CustomerStatus =
  | 'Active'
  | 'Onboarding'
  | 'Pending Renewal'
  | 'Dormant'
  | 'Suspended'
  | 'Terminated / Expired';

export const CUSTOMER_STATUSES: CustomerStatus[] = [
  'Active',
  'Onboarding',
  'Pending Renewal',
  'Dormant',
  'Suspended',
  'Terminated / Expired',
];

export type CustomerType = 'Reseller' | 'Retail/Forecourt' | 'Food & Beverage';

export type PaymentTerm = 'Cash on Delivery' | 'Custom Term';

export interface CustomerModel {
  id: string;
  businessName: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  vatRegistered: boolean;
  vatNumber: string;
  businessEmail: string;
  businessPhone: string;
  customerType: CustomerType;
  creditLimit: number;
  paymentTerm: PaymentTerm;
  paymentDays: number | null;
  // Optional so existing forms that build a customer field by field still compile.
  // The customer list always fills it in (defaults to 'Onboarding').
  status?: CustomerStatus;
}