import { SupplierModel } from './supplier-model';

// Everything the new/import supplier forms produce (id and status are assigned by the list)
export type NewSupplierFormModel = Omit<SupplierModel, 'id' | 'status'>;