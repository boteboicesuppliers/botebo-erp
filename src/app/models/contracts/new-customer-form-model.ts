import { CustomerModel } from './customer-model';

// Everything the New Customer / Import forms provide. The id and status are
// assigned by the customer list (new customers start as 'Onboarding').
export type NewCustomerFormModel = Omit<CustomerModel, 'id' | 'status'>;