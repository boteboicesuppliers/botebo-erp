import { CustomerModel } from './customer-model';

// Data collected by the New Customer form (the id is assigned when the customer is saved)
export type NewCustomerFormModel = Omit<CustomerModel, 'id'>;