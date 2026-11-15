import { Component, signal } from '@angular/core';
import { CustomerModel } from '../../../../models/contracts/customer-model';
import { NewCustomerFormModel } from '../../../../models/contracts/new-customer-form-model';
import { NewCustomerForm } from '../new-customer-form/new-customer-form';

@Component({
  selector: 'app-customer-list-widget',
  imports: [NewCustomerForm],
  templateUrl: './customer-list-widget.html',
})
export class CustomerListWidget {
  // MODAL STATE
  showForm = signal(false);

  // CONTRACTED CUSTOMERS (mock data)
  customers = signal<CustomerModel[]>([
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-002', businessName: 'Cape Engineering', contactFirstName: 'Lauren', contactLastName: 'Fourie', contactEmail: 'lauren@capeeng.co.za', contactPhone: '021 555 0178', address: '8 Voortrekker Road, Bellville, Cape Town', vatRegistered: true, vatNumber: '4234567890', businessEmail: '', businessPhone: '021 555 0150', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-003', businessName: 'Pretoria Fuel Stop', contactFirstName: 'Sipho', contactLastName: 'Dlamini', contactEmail: 'sipho@pretoriafuel.co.za', contactPhone: '012 555 0119', address: '221 Church Street, Pretoria', vatRegistered: false, vatNumber: '', businessEmail: '', businessPhone: '', customerType: 'Retail/Forecourt', creditLimit: 17000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-004', businessName: 'Durban Bites', contactFirstName: 'Priya', contactLastName: 'Naidoo', contactEmail: 'priya@durbanbites.co.za', contactPhone: '031 555 0163', address: '45 Florida Road, Morningside, Durban', vatRegistered: true, vatNumber: '4345678901', businessEmail: 'orders@durbanbites.co.za', businessPhone: '031 555 0140', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-005', businessName: 'Nelspruit Traders', contactFirstName: 'Johan', contactLastName: 'van Wyk', contactEmail: 'johan@nelspruittraders.co.za', contactPhone: '013 555 0127', address: '3 Brown Street, Mbombela', vatRegistered: false, vatNumber: '', businessEmail: '', businessPhone: '013 555 0120', customerType: 'Retail/Forecourt', creditLimit: 1700, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    
  ]);

  // ACTIONS

  openForm(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  addCustomer(data: NewCustomerFormModel): void {
    const id = `CUS-${String(this.customers().length + 1).padStart(3, '0')}`;

    this.customers.update((list) => [{ id, ...data }, ...list]);
    this.closeForm();
  }

  // DISPLAY HELPERS

  formatRand(amount: number): string {
    return 'R ' + amount.toLocaleString('en-US');
  }
}