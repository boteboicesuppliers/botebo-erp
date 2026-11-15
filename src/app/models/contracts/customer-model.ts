export type CustomerType = 'Retail/Forecourt' | 'Food & Beverage' | 'Reseller';

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
}