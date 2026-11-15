import { CustomerModel } from './customer-model';

export type NewCustomerFormModel = Omit<CustomerModel, 'id' | 'status'>;