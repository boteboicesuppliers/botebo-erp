import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { CustomerModel } from '../../../../models/contracts/customer-model';
import { NewCustomerFormModel } from '../../../../models/contracts/new-customer-form-model';
import { DeleteCustomerForm } from '../delete-customer-form/delete-customer-form';
import { EditCustomerForm } from '../edit-customer-form/edit-customer-form';
import { ImportCustomersForm } from '../import-customers-form/import-customers-form';
import { NewCustomerForm } from '../new-customer-form/new-customer-form';
import { StatementForm } from '../statement-form/statement-form';

@Component({
  selector: 'app-customer-list-widget',
  imports: [NewCustomerForm, EditCustomerForm, DeleteCustomerForm, ImportCustomersForm, StatementForm],
  templateUrl: './customer-list-widget.html',
  host: {
    '(document:keydown.escape)': 'closeTopModal()',
    '(document:click)': 'closeMenus()',
  },
})
export class CustomerListWidget {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  // MODAL STATE
  showForm = signal(false);
  editingCustomer = signal<CustomerModel | null>(null);
  deletingCustomer = signal<CustomerModel | null>(null);
  showImport = signal(false);
  showStatement = signal(false);

  // CONTRACTED CUSTOMERS (mock data: 50 records)
  customers = signal<CustomerModel[]>([
    { id: 'CUS-001', businessName: 'Mabena Industrial', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabena.co.za', contactPhone: '011 555 0142', address: '14 Industrial Road, Germiston, Johannesburg', vatRegistered: true, vatNumber: '4123456789', businessEmail: 'accounts@mabena.co.za', businessPhone: '011 555 0100', customerType: 'Reseller', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-002', businessName: 'Cape Engineering', contactFirstName: 'Lauren', contactLastName: 'Fourie', contactEmail: 'lauren@capeeng.co.za', contactPhone: '021 555 0178', address: '8 Voortrekker Road, Bellville, Cape Town', vatRegistered: true, vatNumber: '4234567890', businessEmail: '', businessPhone: '021 555 0150', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-003', businessName: 'Pretoria Fuel Stop', contactFirstName: 'Sipho', contactLastName: 'Dlamini', contactEmail: 'sipho@pretoriafuel.co.za', contactPhone: '012 555 0119', address: '221 Church Street, Pretoria', vatRegistered: false, vatNumber: '', businessEmail: '', businessPhone: '', customerType: 'Retail/Forecourt', creditLimit: 17000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-004', businessName: 'Durban Bites', contactFirstName: 'Priya', contactLastName: 'Naidoo', contactEmail: 'priya@durbanbites.co.za', contactPhone: '031 555 0163', address: '45 Florida Road, Morningside, Durban', vatRegistered: true, vatNumber: '4345678901', businessEmail: 'orders@durbanbites.co.za', businessPhone: '031 555 0140', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-005', businessName: 'Nelspruit Traders', contactFirstName: 'Johan', contactLastName: 'van Wyk', contactEmail: 'johan@nelspruittraders.co.za', contactPhone: '013 555 0127', address: '3 Brown Street, Mbombela', vatRegistered: false, vatNumber: '', businessEmail: '', businessPhone: '013 555 0120', customerType: 'Retail/Forecourt', creditLimit: 1700, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-006', businessName: 'Soweto Hardware Hub', contactFirstName: 'Naledi', contactLastName: 'Moodley', contactEmail: 'naledi@sowetohardware.co.za', contactPhone: '011 555 1100', address: '12 Vilakazi Street, Orlando West, Soweto', vatRegistered: true, vatNumber: '4100000000', businessEmail: '', businessPhone: '', customerType: 'Reseller', creditLimit: 120000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-007', businessName: 'Sandton Cafe Collective', contactFirstName: 'Zanele', contactLastName: 'Mokoena', contactEmail: 'zanele@sandtoncafe.co.za', contactPhone: '011 555 1153', address: '9 Rivonia Road, Sandton, Johannesburg', vatRegistered: true, vatNumber: '4107919117', businessEmail: 'orders@sandtoncafe.co.za', businessPhone: '011 555 0137', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-008', businessName: 'Bloem Motors', contactFirstName: 'Hendrik', contactLastName: 'Venter', contactEmail: 'hendrik@bloemmotors.co.za', contactPhone: '051 555 1206', address: '56 Nelson Mandela Drive, Bloemfontein', vatRegistered: true, vatNumber: '4115838234', businessEmail: 'orders@bloemmotors.co.za', businessPhone: '051 555 0174', customerType: 'Retail/Forecourt', creditLimit: 17000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-009', businessName: 'Kimberley Supplies', contactFirstName: 'Willem', contactLastName: 'Steyn', contactEmail: 'willem@kimberleysupplies.co.za', contactPhone: '053 555 1259', address: '18 Du Toitspan Road, Kimberley', vatRegistered: false, vatNumber: '', businessEmail: 'accounts@kimberleysupplies.co.za', businessPhone: '053 555 0211', customerType: 'Reseller', creditLimit: 85000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-010', businessName: 'Port Elizabeth Marine', contactFirstName: 'Pieter', contactLastName: 'Mahlangu', contactEmail: 'pieter@portelizabeth.co.za', contactPhone: '041 555 1312', address: '4 Govan Mbeki Avenue, Gqeberha', vatRegistered: true, vatNumber: '4131676468', businessEmail: '', businessPhone: '041 555 0248', customerType: 'Reseller', creditLimit: 320000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-011', businessName: 'East London Fuel Centre', contactFirstName: 'Ryan', contactLastName: 'Pretorius', contactEmail: 'ryan@eastlondon.co.za', contactPhone: '043 555 1365', address: '77 Oxford Street, East London', vatRegistered: true, vatNumber: '4139595585', businessEmail: 'orders@eastlondon.co.za', businessPhone: '043 555 0285', customerType: 'Retail/Forecourt', creditLimit: 1700, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-012', businessName: 'Polokwane Fresh Foods', contactFirstName: 'Nomsa', contactLastName: 'Botha', contactEmail: 'nomsa@polokwanefresh.co.za', contactPhone: '015 555 1418', address: '31 Thabo Mbeki Street, Polokwane', vatRegistered: true, vatNumber: '4147514702', businessEmail: 'orders@polokwanefresh.co.za', businessPhone: '015 555 0322', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-013', businessName: 'Stellenbosch Wine Bar', contactFirstName: 'Bongani', contactLastName: 'Ndlovu', contactEmail: 'bongani@stellenboschwine.co.za', contactPhone: '021 555 1471', address: '22 Dorp Street, Stellenbosch', vatRegistered: true, vatNumber: '4155433819', businessEmail: 'orders@stellenboschwine.co.za', businessPhone: '021 555 0359', customerType: 'Food & Beverage', creditLimit: 60000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-014', businessName: 'Umhlanga Eats', contactFirstName: 'Aisha', contactLastName: 'Molefe', contactEmail: 'aisha@umhlangaeats.co.za', contactPhone: '031 555 1524', address: '3 Lagoon Drive, Umhlanga', vatRegistered: false, vatNumber: '', businessEmail: '', businessPhone: '031 555 0396', customerType: 'Food & Beverage', creditLimit: 18000, paymentTerm: 'Custom Term', paymentDays: 45 },
    { id: 'CUS-015', businessName: 'Centurion Auto Parts', contactFirstName: 'Fatima', contactLastName: 'Nel', contactEmail: 'fatima@centurionauto.co.za', contactPhone: '012 555 1577', address: '140 Lenchen Avenue, Centurion', vatRegistered: true, vatNumber: '4171272053', businessEmail: 'accounts@centurionauto.co.za', businessPhone: '', customerType: 'Reseller', creditLimit: 320000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-016', businessName: 'Midrand Logistics', contactFirstName: 'Craig', contactLastName: 'Khumalo', contactEmail: 'craig@midrandlogistics.co.za', contactPhone: '011 555 1630', address: '8 Old Pretoria Road, Midrand', vatRegistered: true, vatNumber: '4179191170', businessEmail: 'accounts@midrandlogistics.co.za', businessPhone: '011 555 0470', customerType: 'Reseller', creditLimit: 120000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-017', businessName: 'Randburg Quick Stop', contactFirstName: 'Sipho', contactLastName: 'Sithole', contactEmail: 'sipho@randburgquick.co.za', contactPhone: '011 555 1683', address: '61 Republic Road, Randburg', vatRegistered: true, vatNumber: '4187110287', businessEmail: 'orders@randburgquick.co.za', businessPhone: '011 555 0507', customerType: 'Retail/Forecourt', creditLimit: 8500, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-018', businessName: 'Rustenburg Mining Supplies', contactFirstName: 'Kobus', contactLastName: 'Jacobs', contactEmail: 'kobus@rustenburgmining.co.za', contactPhone: '014 555 1736', address: '5 Beyers Naude Drive, Rustenburg', vatRegistered: true, vatNumber: '4195029404', businessEmail: '', businessPhone: '014 555 0544', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-019', businessName: 'George Garden Route Grill', contactFirstName: 'Lerato', contactLastName: 'Patel', contactEmail: 'lerato@georgegarden.co.za', contactPhone: '044 555 1789', address: '19 York Street, George', vatRegistered: false, vatNumber: '', businessEmail: 'orders@georgegarden.co.za', businessPhone: '044 555 0581', customerType: 'Food & Beverage', creditLimit: 18000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-020', businessName: 'Pietermaritzburg Trading', contactFirstName: 'Thandi', contactLastName: 'Dube', contactEmail: 'thandi@pietermaritzburgtrading.co.za', contactPhone: '033 555 1842', address: '27 Church Street, Pietermaritzburg', vatRegistered: true, vatNumber: '4210867638', businessEmail: 'orders@pietermaritzburgtrading.co.za', businessPhone: '033 555 0618', customerType: 'Retail/Forecourt', creditLimit: 12000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-021', businessName: 'Richards Bay Fuel & Go', contactFirstName: 'Naledi', contactLastName: 'Smit', contactEmail: 'naledi@richardsbay.co.za', contactPhone: '035 555 1895', address: '2 Mars Street, Richards Bay', vatRegistered: true, vatNumber: '4218786755', businessEmail: 'orders@richardsbay.co.za', businessPhone: '035 555 0655', customerType: 'Retail/Forecourt', creditLimit: 1700, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-022', businessName: 'Witbank Industrial Supply', contactFirstName: 'Zanele', contactLastName: 'Moodley', contactEmail: 'zanele@witbankindustrial.co.za', contactPhone: '013 555 1948', address: '90 Mandela Street, eMalahleni', vatRegistered: true, vatNumber: '4226705872', businessEmail: '', businessPhone: '013 555 0692', customerType: 'Reseller', creditLimit: 175000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-023', businessName: 'Vereeniging Bakery', contactFirstName: 'Hendrik', contactLastName: 'Mokoena', contactEmail: 'hendrik@vereenigingbakery.co.za', contactPhone: '016 555 1101', address: '14 Market Street, Vereeniging', vatRegistered: true, vatNumber: '4234624989', businessEmail: 'orders@vereenigingbakery.co.za', businessPhone: '016 555 0729', customerType: 'Food & Beverage', creditLimit: 60000, paymentTerm: 'Custom Term', paymentDays: 90 },
    { id: 'CUS-024', businessName: 'Krugersdorp Hardware', contactFirstName: 'Willem', contactLastName: 'Venter', contactEmail: 'willem@krugersdorphardware.co.za', contactPhone: '011 555 1154', address: '33 Commissioner Street, Krugersdorp', vatRegistered: false, vatNumber: '', businessEmail: 'accounts@krugersdorphardware.co.za', businessPhone: '', customerType: 'Reseller', creditLimit: 85000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-025', businessName: 'Benoni Truck Stop', contactFirstName: 'Pieter', contactLastName: 'Steyn', contactEmail: 'pieter@benonitruck.co.za', contactPhone: '011 555 1207', address: '101 Northrand Road, Benoni', vatRegistered: true, vatNumber: '4250463223', businessEmail: 'orders@benonitruck.co.za', businessPhone: '011 555 0803', customerType: 'Retail/Forecourt', creditLimit: 12000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-026', businessName: 'Boksburg Catering Co', contactFirstName: 'Ryan', contactLastName: 'Mahlangu', contactEmail: 'ryan@boksburgcatering.co.za', contactPhone: '011 555 1260', address: '6 North Rand Road, Boksburg', vatRegistered: true, vatNumber: '4258382340', businessEmail: '', businessPhone: '011 555 0840', customerType: 'Food & Beverage', creditLimit: 25000, paymentTerm: 'Custom Term', paymentDays: 45 },
    { id: 'CUS-027', businessName: 'Paarl Valley Foods', contactFirstName: 'Nomsa', contactLastName: 'Pretorius', contactEmail: 'nomsa@paarlvalley.co.za', contactPhone: '021 555 1313', address: '48 Main Road, Paarl', vatRegistered: true, vatNumber: '4266301457', businessEmail: 'orders@paarlvalley.co.za', businessPhone: '021 555 0877', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-028', businessName: 'Worcester Farm Supplies', contactFirstName: 'Bongani', contactLastName: 'Botha', contactEmail: 'bongani@worcesterfarm.co.za', contactPhone: '023 555 1366', address: '15 Church Street, Worcester', vatRegistered: true, vatNumber: '4274220574', businessEmail: 'accounts@worcesterfarm.co.za', businessPhone: '023 555 0914', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-029', businessName: 'Upington Petroleum', contactFirstName: 'Aisha', contactLastName: 'Ndlovu', contactEmail: 'aisha@upingtonpetroleum.co.za', contactPhone: '054 555 1419', address: '7 Schroder Street, Upington', vatRegistered: false, vatNumber: '', businessEmail: 'orders@upingtonpetroleum.co.za', businessPhone: '054 555 0951', customerType: 'Retail/Forecourt', creditLimit: 35000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-030', businessName: 'Mthatha Wholesale', contactFirstName: 'Fatima', contactLastName: 'Molefe', contactEmail: 'fatima@mthathawholesale.co.za', contactPhone: '047 555 1472', address: '21 Sutherland Street, Mthatha', vatRegistered: true, vatNumber: '4290058808', businessEmail: '', businessPhone: '047 555 0988', customerType: 'Reseller', creditLimit: 320000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-031', businessName: 'Mafikeng Convenience', contactFirstName: 'Craig', contactLastName: 'Nel', contactEmail: 'craig@mafikengconvenience.co.za', contactPhone: '018 555 1525', address: '11 Molopo Road, Mahikeng', vatRegistered: true, vatNumber: '4297977925', businessEmail: 'orders@mafikengconvenience.co.za', businessPhone: '018 555 0125', customerType: 'Retail/Forecourt', creditLimit: 1700, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-032', businessName: 'Klerksdorp Meat Market', contactFirstName: 'Sipho', contactLastName: 'Khumalo', contactEmail: 'sipho@klerksdorpmeat.co.za', contactPhone: '018 555 1578', address: '36 OR Tambo Street, Klerksdorp', vatRegistered: true, vatNumber: '4305897042', businessEmail: 'orders@klerksdorpmeat.co.za', businessPhone: '018 555 0162', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 45 },
    { id: 'CUS-033', businessName: 'Potchefstroom Depot', contactFirstName: 'Kobus', contactLastName: 'Sithole', contactEmail: 'kobus@potchefstroomdepot.co.za', contactPhone: '018 555 1631', address: '25 Lombard Street, Potchefstroom', vatRegistered: true, vatNumber: '4313816159', businessEmail: 'accounts@potchefstroomdepot.co.za', businessPhone: '', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-034', businessName: 'Ballito Beach Kitchen', contactFirstName: 'Lerato', contactLastName: 'Jacobs', contactEmail: 'lerato@ballitobeach.co.za', contactPhone: '032 555 1684', address: '13 Compensation Beach Road, Ballito', vatRegistered: false, vatNumber: '', businessEmail: '', businessPhone: '032 555 0236', customerType: 'Food & Beverage', creditLimit: 18000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-035', businessName: 'Newcastle Fuel Point', contactFirstName: 'Thandi', contactLastName: 'Patel', contactEmail: 'thandi@newcastlefuel.co.za', contactPhone: '034 555 1737', address: '44 Scott Street, Newcastle', vatRegistered: true, vatNumber: '4329654393', businessEmail: 'orders@newcastlefuel.co.za', businessPhone: '034 555 0273', customerType: 'Retail/Forecourt', creditLimit: 12000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-036', businessName: 'Hermanus Coastal Cafe', contactFirstName: 'Naledi', contactLastName: 'Dube', contactEmail: 'naledi@hermanuscoastal.co.za', contactPhone: '028 555 1790', address: '8 Marine Drive, Hermanus', vatRegistered: true, vatNumber: '4337573510', businessEmail: 'orders@hermanuscoastal.co.za', businessPhone: '028 555 0310', customerType: 'Food & Beverage', creditLimit: 25000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-037', businessName: 'Mossel Bay Motors', contactFirstName: 'Zanele', contactLastName: 'Smit', contactEmail: 'zanele@mosselbay.co.za', contactPhone: '044 555 1843', address: '29 Marsh Street, Mossel Bay', vatRegistered: true, vatNumber: '4345492627', businessEmail: 'orders@mosselbay.co.za', businessPhone: '044 555 0347', customerType: 'Retail/Forecourt', creditLimit: 8500, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-038', businessName: 'Secunda Engineering', contactFirstName: 'Hendrik', contactLastName: 'Moodley', contactEmail: 'hendrik@secundaengineering.co.za', contactPhone: '017 555 1896', address: '17 Kruger Street, Secunda', vatRegistered: true, vatNumber: '4353411744', businessEmail: '', businessPhone: '017 555 0384', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 45 },
    { id: 'CUS-039', businessName: 'Sasolburg Chemical Traders', contactFirstName: 'Willem', contactLastName: 'Mokoena', contactEmail: 'willem@sasolburgchemical.co.za', contactPhone: '016 555 1949', address: '52 Fichardt Street, Sasolburg', vatRegistered: false, vatNumber: '', businessEmail: 'accounts@sasolburgchemical.co.za', businessPhone: '016 555 0421', customerType: 'Reseller', creditLimit: 85000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-040', businessName: 'Ermelo Highveld Foods', contactFirstName: 'Pieter', contactLastName: 'Venter', contactEmail: 'pieter@ermelohighveld.co.za', contactPhone: '017 555 1102', address: '9 Church Street, Ermelo', vatRegistered: true, vatNumber: '4369249978', businessEmail: 'orders@ermelohighveld.co.za', businessPhone: '017 555 0458', customerType: 'Food & Beverage', creditLimit: 75000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-041', businessName: 'Kroonstad Spares', contactFirstName: 'Ryan', contactLastName: 'Steyn', contactEmail: 'ryan@kroonstadspares.co.za', contactPhone: '056 555 1155', address: '63 Cross Street, Kroonstad', vatRegistered: true, vatNumber: '4377169095', businessEmail: 'accounts@kroonstadspares.co.za', businessPhone: '056 555 0495', customerType: 'Reseller', creditLimit: 120000, paymentTerm: 'Custom Term', paymentDays: 90 },
    { id: 'CUS-042', businessName: 'Welkom Gold Fuel', contactFirstName: 'Nomsa', contactLastName: 'Mahlangu', contactEmail: 'nomsa@welkomgold.co.za', contactPhone: '057 555 1208', address: '40 Stateway, Welkom', vatRegistered: true, vatNumber: '4385088212', businessEmail: '', businessPhone: '', customerType: 'Retail/Forecourt', creditLimit: 8500, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-043', businessName: 'Springs Pallet Works', contactFirstName: 'Bongani', contactLastName: 'Pretorius', contactEmail: 'bongani@springspallet.co.za', contactPhone: '011 555 1261', address: '120 Third Street, Springs', vatRegistered: true, vatNumber: '4393007329', businessEmail: 'accounts@springspallet.co.za', businessPhone: '011 555 0569', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 30 },
    { id: 'CUS-044', businessName: 'Alberton Auto Group', contactFirstName: 'Aisha', contactLastName: 'Botha', contactEmail: 'aisha@albertonauto.co.za', contactPhone: '011 555 1314', address: '75 Voortrekker Road, Alberton', vatRegistered: false, vatNumber: '', businessEmail: 'accounts@albertonauto.co.za', businessPhone: '011 555 0606', customerType: 'Reseller', creditLimit: 85000, paymentTerm: 'Custom Term', paymentDays: 45 },
    { id: 'CUS-045', businessName: 'Roodepoort Roasters', contactFirstName: 'Fatima', contactLastName: 'Ndlovu', contactEmail: 'fatima@roodepoortroasters.co.za', contactPhone: '011 555 1367', address: '5 Ontdekkers Road, Roodepoort', vatRegistered: true, vatNumber: '4408845563', businessEmail: 'orders@roodepoortroasters.co.za', businessPhone: '011 555 0643', customerType: 'Food & Beverage', creditLimit: 75000, paymentTerm: 'Custom Term', paymentDays: 60 },
    { id: 'CUS-046', businessName: 'Fourways Forecourt', contactFirstName: 'Craig', contactLastName: 'Molefe', contactEmail: 'craig@fourwaysforecourt.co.za', contactPhone: '011 555 1420', address: '1 Cedar Road, Fourways', vatRegistered: true, vatNumber: '4416764680', businessEmail: '', businessPhone: '011 555 0680', customerType: 'Retail/Forecourt', creditLimit: 1700, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-047', businessName: 'Brits Farm Stall', contactFirstName: 'Sipho', contactLastName: 'Nel', contactEmail: 'sipho@britsfarm.co.za', contactPhone: '012 555 1473', address: '23 Van Velden Street, Brits', vatRegistered: true, vatNumber: '4424683797', businessEmail: 'orders@britsfarm.co.za', businessPhone: '012 555 0717', customerType: 'Food & Beverage', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 90 },
    { id: 'CUS-048', businessName: 'Tzaneen Citrus Traders', contactFirstName: 'Kobus', contactLastName: 'Khumalo', contactEmail: 'kobus@tzaneencitrus.co.za', contactPhone: '015 555 1526', address: '16 Agatha Street, Tzaneen', vatRegistered: true, vatNumber: '4432602914', businessEmail: 'accounts@tzaneencitrus.co.za', businessPhone: '015 555 0754', customerType: 'Reseller', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 14 },
    { id: 'CUS-049', businessName: 'Mbombela Express Fuel', contactFirstName: 'Lerato', contactLastName: 'Sithole', contactEmail: 'lerato@mbombelaexpress.co.za', contactPhone: '013 555 1579', address: '80 Samora Machel Drive, Mbombela', vatRegistered: false, vatNumber: '', businessEmail: 'orders@mbombelaexpress.co.za', businessPhone: '013 555 0791', customerType: 'Retail/Forecourt', creditLimit: 35000, paymentTerm: 'Cash on Delivery', paymentDays: null },
    { id: 'CUS-050', businessName: 'Somerset West Distributors', contactFirstName: 'Thandi', contactLastName: 'Jacobs', contactEmail: 'thandi@somersetwest.co.za', contactPhone: '021 555 1632', address: '34 Main Road, Somerset West', vatRegistered: true, vatNumber: '4448441148', businessEmail: '', businessPhone: '021 555 0828', customerType: 'Reseller', creditLimit: 320000, paymentTerm: 'Custom Term', paymentDays: 45 },
  ]);

  // SELECTION / DETAILS PANEL / MORE MENU
  selected = signal<CustomerModel | null>(null);
  detailsOpen = signal(true);
  moreOpen = signal(false);
  actionsOpen = signal(false);

  // FILTERS (draft values are applied on Find)
  draftSearch = signal('');
  draftType = signal('');
  draftVat = signal('');
  draftTerm = signal('');
  appliedFilters = signal({ search: '', type: '', vat: '', term: '' });

  // SORT + PAGINATION
  sortAsc = signal(true);
  pageSize = signal(8);
  page = signal(1);

  // DERIVED STATE

  vatCount = computed(() => this.customers().filter((c) => c.vatRegistered).length);

  customerTypes = computed(() => [...new Set(this.customers().map((c) => c.customerType))].sort());

  paymentTerms = computed(() => [...new Set(this.customers().map((c) => c.paymentTerm))].sort());

  filteredCustomers = computed(() => {
    const { search, type, vat, term } = this.appliedFilters();
    const q = search.trim().toLowerCase();

    const filtered = this.customers().filter((c) => {
      const matchesSearch =
        !q ||
        c.businessName.toLowerCase().includes(q) ||
        (c.businessEmail ?? '').toLowerCase().includes(q) ||
        (c.businessPhone ?? '').toLowerCase().includes(q);
      const matchesType = !type || c.customerType === type;
      const matchesVat =
        !vat || (vat === 'registered' ? c.vatRegistered : !c.vatRegistered);
      const matchesTerm = !term || c.paymentTerm === term;

      return matchesSearch && matchesType && matchesVat && matchesTerm;
    });

    const dir = this.sortAsc() ? 1 : -1;

    return [...filtered].sort((a, b) => dir * a.businessName.localeCompare(b.businessName));
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredCustomers().length / this.pageSize())),
  );

  safePage = computed(() => Math.min(this.page(), this.totalPages()));

  pagedCustomers = computed(() => {
    const start = (this.safePage() - 1) * this.pageSize();

    return this.filteredCustomers().slice(start, start + this.pageSize());
  });

  rangeStart = computed(() =>
    this.filteredCustomers().length === 0 ? 0 : (this.safePage() - 1) * this.pageSize() + 1,
  );

  rangeEnd = computed(() =>
    Math.min(this.safePage() * this.pageSize(), this.filteredCustomers().length),
  );

  pageNumbers = computed<(number | '...')[]>(() => {
    const total = this.totalPages();
    const current = this.safePage();

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [...new Set([1, 2, 3, current - 1, current, current + 1, total])]
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);
    const result: (number | '...')[] = [];

    pages.forEach((p, i) => {
      if (i > 0 && p - pages[i - 1] > 1) {
        result.push('...');
      }
      result.push(p);
    });

    return result;
  });

  // ACTIONS: FILTERS

  find(): void {
    this.appliedFilters.set({
      search: this.draftSearch(),
      type: this.draftType(),
      vat: this.draftVat(),
      term: this.draftTerm(),
    });
    this.page.set(1);
  }

  reset(): void {
    this.draftSearch.set('');
    this.draftType.set('');
    this.draftVat.set('');
    this.draftTerm.set('');
    this.appliedFilters.set({ search: '', type: '', vat: '', term: '' });
    this.page.set(1);
  }

  // ACTIONS: SORT + PAGINATION

  toggleSort(): void {
    this.sortAsc.update((v) => !v);
  }

  goTo(page: number): void {
    this.page.set(Math.min(Math.max(1, page), this.totalPages()));
    this.scrollToTop();
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
  }

  // Scrolls whichever ancestor scrolls the page (or the window) back to the top
  private scrollToTop(): void {
    let el: HTMLElement | null = this.host.nativeElement.parentElement;

    while (el) {
      const overflowY = getComputedStyle(el).overflowY;

      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      el = el.parentElement;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ACTIONS: SELECTION + TOOLBAR

  isSelected(customer: CustomerModel): boolean {
    return this.selected() === customer;
  }

  toggleRow(customer: CustomerModel): void {
    this.selected.set(this.selected() === customer ? null : customer);
  }

  clearSelection(): void {
    this.selected.set(null);
  }

  selectFirst(): void {
    if (this.selected()) {
      this.selected.set(null);
      return;
    }

    this.selected.set(this.pagedCustomers()[0] ?? null);
  }

  editSelected(): void {
    const target = this.selected();

    if (target) {
      this.openEdit(target);
    }
  }

  deleteSelected(): void {
    const target = this.selected();

    if (target) {
      this.openDelete(target);
    }

    this.closeMore();
  }

  toggleMore(event: Event): void {
    event.stopPropagation();
    this.moreOpen.update((v) => !v);
  }

  closeMore(): void {
    this.moreOpen.set(false);
  }

  toggleActions(event: Event): void {
    event.stopPropagation();
    this.moreOpen.set(false);
    this.actionsOpen.update((v) => !v);
  }

  closeMenus(): void {
    this.moreOpen.set(false);
    this.actionsOpen.set(false);
  }

  // Escape closes only the top-most open modal
  closeTopModal(): void {
    if (this.deletingCustomer()) return this.closeDelete();
    if (this.editingCustomer()) return this.closeEdit();
    if (this.showImport()) return this.closeImport();
    if (this.showStatement()) return this.closeStatement();
    if (this.showForm()) return this.closeForm();
  }

  print(): void {
    window.print();
  }

  // ACTIONS: ADD

  openForm(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  addCustomer(data: NewCustomerFormModel): void {
    const id = this.formatId(this.nextIdNumber());

    this.customers.update((list) => [{ id, ...data }, ...list]);
    this.closeForm();
  }

  // ACTIONS: IMPORT

  openImport(): void {
    this.actionsOpen.set(false);
    this.showImport.set(true);
  }

  closeImport(): void {
    this.showImport.set(false);
  }

  importCustomers(rows: NewCustomerFormModel[]): void {
    let next = this.nextIdNumber();
    const created: CustomerModel[] = rows.map((r) => ({ id: this.formatId(next++), ...r }));

    this.customers.update((list) => [...list, ...created]);
    this.page.set(1);
    this.closeImport();
  }

  // ACTIONS: STATEMENT OF ACCOUNTS

  openStatement(): void {
    this.actionsOpen.set(false);
    this.showStatement.set(true);
  }

  closeStatement(): void {
    this.showStatement.set(false);
  }

  // ACTIONS: EDIT

  openEdit(customer: CustomerModel): void {
    this.editingCustomer.set(customer);
  }

  closeEdit(): void {
    this.editingCustomer.set(null);
  }

  updateCustomer(updated: CustomerModel): void {
    const original = this.editingCustomer();

    // Match by reference (not id) so duplicate mock ids can't update the wrong rows
    this.customers.update((list) => list.map((c) => (c === original ? updated : c)));

    if (this.selected() === original) {
      this.selected.set(updated);
    }

    this.closeEdit();
  }

  // ACTIONS: DELETE

  openDelete(customer: CustomerModel): void {
    this.deletingCustomer.set(customer);
  }

  closeDelete(): void {
    this.deletingCustomer.set(null);
  }

  confirmDelete(): void {
    const target = this.deletingCustomer();

    this.customers.update((list) => list.filter((c) => c !== target));

    if (this.selected() === target) {
      this.selected.set(null);
    }

    this.closeDelete();
  }

  // ID HELPERS (max-based so deletes and imports never produce duplicate ids)

  private nextIdNumber(): number {
    return Math.max(0, ...this.customers().map((c) => Number(c.id.replace(/\D/g, '')))) + 1;
  }

  private formatId(n: number): string {
    return `CUS-${String(n).padStart(3, '0')}`;
  }

  // DISPLAY HELPERS

  formatRand(amount: number): string {
    return 'R ' + amount.toLocaleString('en-US');
  }
}