import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import {
  SupplierModel,
  SupplierStatus,
  SupplierType,
} from '../../../../models/suppliers/supplier-model';
import { NewSupplierFormModel } from '../../../../models/suppliers/new-supplier-form-model';
import {
  AdvancedQuery,
  QueryGroup,
  QueryRun,
} from '../../../../services/suppliers/advanced-query';
import { AdvancedQueryForm } from '../advanced-query-form/advanced-query-form';
import { DeleteSupplierForm } from '../delete-supplier-form/delete-supplier-form';
import { EditSupplierForm } from '../edit-supplier-form/edit-supplier-form';
import { ImportSuppliersForm } from '../import-suppliers-form/import-suppliers-form';
import { NewSupplierForm } from '../new-supplier-form/new-supplier-form';
import { StatementForm } from '../statement-form/statement-form';

// STATUS BADGE STYLES (same palette as customers)
const STATUS_STYLES: Record<SupplierStatus, string> = {
  'Approved': 'bg-emerald-100 text-emerald-900',
  'Pending Approval': 'bg-amber-100 text-amber-900',
  'Inactive': 'bg-sky-100 text-sky-900',
  'On Hold': 'bg-orange-100 text-orange-900',
  'Disqualified': 'bg-red-100 text-red-900',
};

// CURRENCY SYMBOLS
const CURRENCY_SYMBOL: Record<string, string> = {
  ZAR: 'R',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

// Mock data only: spreads a realistic mix of statuses across the records
const MOCK_STATUS_CYCLE: SupplierStatus[] = [
  'Approved', 'Approved', 'Pending Approval', 'Approved', 'On Hold', 'Inactive',
  'Approved', 'Disqualified', 'Approved', 'Pending Approval', 'Approved',
];

function withMockStatus(rows: Omit<SupplierModel, 'status'>[]): SupplierModel[] {
  return rows.map((r, i) => ({ ...r, status: MOCK_STATUS_CYCLE[i % MOCK_STATUS_CYCLE.length] }));
}

@Component({
  selector: 'app-suppliers-list-widget',
  imports: [
    NewSupplierForm,
    EditSupplierForm,
    DeleteSupplierForm,
    ImportSuppliersForm,
    StatementForm,
    AdvancedQueryForm,
  ],
  templateUrl: './suppliers-list-widget.html',
  host: {
    '(document:keydown.escape)': 'closeTopModal()',
    '(document:click)': 'closeMenus()',
  },
})
export class SuppliersListWidget {
  private querySvc = inject(AdvancedQuery);

  // The scrolling table area (rows scroll under the fixed panel and sticky header)
  private tableScroll = viewChild<ElementRef<HTMLElement>>('tableScroll');

  // Options for the category view switcher
  readonly supplierTypes: SupplierType[] = ['Business', 'Individual'];

  // MODAL STATE
  showForm = signal(false);
  editingSupplier = signal<SupplierModel | null>(null);
  deletingSupplier = signal<SupplierModel | null>(null);
  showImport = signal(false);
  showStatement = signal(false);
  showAdvanced = signal(false);

  // ADVANCED + SAVED QUERIES
  advancedQuery = signal<QueryGroup | null>(null);
  activeSavedId = signal<string | null>(null);
  savedOpen = signal(false);
  savedQueries = this.querySvc.savedQueries;

  // SUPPLIERS (mock data)
  suppliers = signal<SupplierModel[]>(withMockStatus([
    // ---------- BUSINESS SUPPLIERS ----------
    { id: 'SUP-001', supplierType: 'Business', name: 'Mabena Steel Works', address: '14 Industrial Road, Germiston, Johannesburg', email: 'accounts@mabenasteel.co.za', phone: '011 555 0100', contactFirstName: 'Thabo', contactLastName: 'Mabena', contactEmail: 'thabo@mabenasteel.co.za', vatRegistered: true, vatNumber: '4123456789', creditLimit: 170000, paymentTerm: 'Custom Term', paymentDays: 30, currency: 'ZAR', bankName: 'FNB', bankAccountNumber: '62845120934', branchCode: '250655', leadTimeDays: 7 },
    { id: 'SUP-002', supplierType: 'Business', name: 'Cape Packaging Solutions', address: '8 Voortrekker Road, Bellville, Cape Town', email: 'sales@capepack.co.za', phone: '021 555 0150', contactFirstName: 'Lauren', contactLastName: 'Fourie', contactEmail: 'lauren@capepack.co.za', vatRegistered: true, vatNumber: '4234567890', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 60, currency: 'ZAR', bankName: 'Standard Bank', bankAccountNumber: '071234567', branchCode: '051001', leadTimeDays: 10 },
    { id: 'SUP-003', supplierType: 'Individual', name: 'Thabo Mokoena', address: '22 Jacaranda Street, Hatfield, Pretoria', email: 'thabo.mokoena@gmail.com', phone: '082 555 0123', contactFirstName: '', contactLastName: '', contactEmail: '', vatRegistered: false, vatNumber: '', creditLimit: 15000, paymentTerm: 'Cash on Delivery', paymentDays: null, currency: 'ZAR', bankName: 'Capitec', bankAccountNumber: '1523648790', branchCode: '470010', leadTimeDays: 3 },
    { id: 'SUP-004', supplierType: 'Business', name: 'Durban Fresh Produce', address: '45 Florida Road, Morningside, Durban', email: 'orders@durbanfresh.co.za', phone: '031 555 0140', contactFirstName: 'Priya', contactLastName: 'Naidoo', contactEmail: 'priya@durbanfresh.co.za', vatRegistered: true, vatNumber: '4345678901', creditLimit: 45000, paymentTerm: 'Custom Term', paymentDays: 14, currency: 'ZAR', bankName: 'Absa', bankAccountNumber: '4087654321', branchCode: '632005', leadTimeDays: 2 },
    { id: 'SUP-005', supplierType: 'Individual', name: 'Lerato Khumalo', address: '9 Protea Avenue, Fourways, Johannesburg', email: 'lerato.khumalo@outlook.com', phone: '083 555 0177', contactFirstName: '', contactLastName: '', contactEmail: '', vatRegistered: false, vatNumber: '', creditLimit: 8000, paymentTerm: 'Custom Term', paymentDays: 14, currency: 'ZAR', bankName: 'Nedbank', bankAccountNumber: '1198765432', branchCode: '198765', leadTimeDays: 5 },
    { id: 'SUP-006', supplierType: 'Business', name: 'Shenzhen Components Ltd', address: '88 Nanshan Road, Shenzhen, China', email: 'export@szcomponents.cn', phone: '+86 755 5550 1122', contactFirstName: 'Wei', contactLastName: 'Zhang', contactEmail: 'wei.zhang@szcomponents.cn', vatRegistered: false, vatNumber: '', creditLimit: 120000, paymentTerm: 'Custom Term', paymentDays: 60, currency: 'USD', bankName: 'Standard Bank', bankAccountNumber: '071998877', branchCode: '051001', leadTimeDays: 35 },
    { id: 'SUP-007', supplierType: 'Business', name: 'Rotterdam Lubricants BV', address: '12 Havenstraat, Rotterdam, Netherlands', email: 'sales@rotterdamlube.nl', phone: '+31 10 555 0144', contactFirstName: 'Jan', contactLastName: 'de Vries', contactEmail: 'jan@rotterdamlube.nl', vatRegistered: false, vatNumber: '', creditLimit: 90000, paymentTerm: 'Custom Term', paymentDays: 45, currency: 'EUR', bankName: 'Absa', bankAccountNumber: '4099887766', branchCode: '632005', leadTimeDays: 28 },
    { id: 'SUP-008', supplierType: 'Business', name: 'Pretoria Tyre Depot', address: '221 Church Street, Pretoria', email: 'accounts@pretoriatyre.co.za', phone: '012 555 0119', contactFirstName: 'Sipho', contactLastName: 'Dlamini', contactEmail: 'sipho@pretoriatyre.co.za', vatRegistered: true, vatNumber: '4115838234', creditLimit: 85000, paymentTerm: 'Cash on Delivery', paymentDays: null, currency: 'ZAR', bankName: 'FNB', bankAccountNumber: '62700011223', branchCode: '250655', leadTimeDays: 4 },
    { id: 'SUP-009', supplierType: 'Individual', name: 'Johan van Wyk', address: '3 Brown Street, Mbombela', email: 'johan.vanwyk@webmail.co.za', phone: '084 555 0127', contactFirstName: '', contactLastName: '', contactEmail: '', vatRegistered: false, vatNumber: '', creditLimit: 12000, paymentTerm: 'Cash on Delivery', paymentDays: null, currency: 'ZAR', bankName: 'Capitec', bankAccountNumber: '1634527891', branchCode: '470010', leadTimeDays: 3 },
    { id: 'SUP-010', supplierType: 'Business', name: 'Polokwane Diesel Haulage', address: '31 Thabo Mbeki Street, Polokwane', email: 'dispatch@polokwanediesel.co.za', phone: '015 555 0322', contactFirstName: 'Nomsa', contactLastName: 'Botha', contactEmail: 'nomsa@polokwanediesel.co.za', vatRegistered: true, vatNumber: '4147514702', creditLimit: 320000, paymentTerm: 'Custom Term', paymentDays: 30, currency: 'ZAR', bankName: 'Nedbank', bankAccountNumber: '1187654321', branchCode: '198765', leadTimeDays: 6 },
    { id: 'SUP-011', supplierType: 'Individual', name: 'Naledi Dube', address: '27 Church Street, Pietermaritzburg', email: 'naledi.dube@gmail.com', phone: '072 555 0188', contactFirstName: '', contactLastName: '', contactEmail: '', vatRegistered: false, vatNumber: '', creditLimit: 6000, paymentTerm: 'Custom Term', paymentDays: 30, currency: 'ZAR', bankName: 'Standard Bank', bankAccountNumber: '071456789', branchCode: '051001', leadTimeDays: 5 },
    { id: 'SUP-012', supplierType: 'Business', name: 'Bloem Safety Gear', address: '56 Nelson Mandela Drive, Bloemfontein', email: 'orders@bloemsafety.co.za', phone: '051 555 0174', contactFirstName: 'Hendrik', contactLastName: 'Venter', contactEmail: 'hendrik@bloemsafety.co.za', vatRegistered: true, vatNumber: '4131676468', creditLimit: 60000, paymentTerm: 'Custom Term', paymentDays: 30, currency: 'ZAR', bankName: 'Absa', bankAccountNumber: '4077001122', branchCode: '632005', leadTimeDays: 8 },
    { id: 'SUP-013', supplierType: 'Business', name: 'Kimberley Chemicals', address: '18 Du Toitspan Road, Kimberley', email: 'accounts@kimberleychem.co.za', phone: '053 555 0211', contactFirstName: 'Willem', contactLastName: 'Steyn', contactEmail: 'willem@kimberleychem.co.za', vatRegistered: false, vatNumber: '', creditLimit: 85000, paymentTerm: 'Custom Term', paymentDays: 60, currency: 'ZAR', bankName: 'FNB', bankAccountNumber: '62811223344', branchCode: '250655', leadTimeDays: 12 },
    { id: 'SUP-014', supplierType: 'Individual', name: 'Priya Naidoo', address: '5 Ontdekkers Road, Roodepoort', email: 'priya.naidoo@icloud.com', phone: '079 555 0155', contactFirstName: '', contactLastName: '', contactEmail: '', vatRegistered: false, vatNumber: '', creditLimit: 10000, paymentTerm: 'Cash on Delivery', paymentDays: null, currency: 'ZAR', bankName: 'Capitec', bankAccountNumber: '1745638290', branchCode: '470010', leadTimeDays: 2 },
    { id: 'SUP-015', supplierType: 'Business', name: 'Gqeberha Marine Parts', address: '4 Govan Mbeki Avenue, Gqeberha', email: 'sales@gqebmarine.co.za', phone: '041 555 0248', contactFirstName: 'Pieter', contactLastName: 'Mahlangu', contactEmail: 'pieter@gqebmarine.co.za', vatRegistered: true, vatNumber: '4139595585', creditLimit: 320000, paymentTerm: 'Custom Term', paymentDays: 30, currency: 'ZAR', bankName: 'Standard Bank', bankAccountNumber: '071667788', branchCode: '051001', leadTimeDays: 14 },
    { id: 'SUP-016', supplierType: 'Business', name: 'Nelspruit Citrus Packers', address: '16 Agatha Street, Mbombela', email: 'orders@nelcitrus.co.za', phone: '013 555 0754', contactFirstName: 'Kobus', contactLastName: 'Khumalo', contactEmail: 'kobus@nelcitrus.co.za', vatRegistered: true, vatNumber: '4432602914', creditLimit: 250000, paymentTerm: 'Custom Term', paymentDays: 14, currency: 'ZAR', bankName: 'Nedbank', bankAccountNumber: '1122334455', branchCode: '198765', leadTimeDays: 5 },
  ]));

  // SELECTION / DETAILS PANEL / MORE MENU
  selected = signal<SupplierModel | null>(null);
  detailsOpen = signal(true);
  moreOpen = signal(false);
  actionsOpen = signal(false);

  // FILTERS (draft values are applied on Find, except Supplier Type which switches instantly)
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

  vatCount = computed(() => this.suppliers().filter((s) => s.vatRegistered).length);

  businessCount = computed(() => this.suppliers().filter((s) => s.supplierType === 'Business').length);

  individualCount = computed(() => this.suppliers().filter((s) => s.supplierType === 'Individual').length);

  paymentTerms = computed(() => [...new Set(this.suppliers().map((s) => s.paymentTerm))].sort());

  // Name of the saved query currently applied (null when none, or if it was deleted)
  activeSavedName = computed(() => {
    const id = this.activeSavedId();

    return id ? (this.savedQueries().find((s) => s.id === id)?.name ?? null) : null;
  });

  // "View:" label follows the Supplier Type dropdown immediately
  viewLabel = computed(() => {
    const type = this.draftType();
    const base = type ? `${type} suppliers` : 'All suppliers';
    const saved = this.activeSavedName();

    if (saved) return `${base} · ${saved}`;

    return this.advancedQuery() ? `${base} + advanced query` : base;
  });

  filteredSuppliers = computed(() => {
    const { search, type, vat, term } = this.appliedFilters();
    const advanced = this.advancedQuery();
    const q = search.trim().toLowerCase();

    const filtered = this.suppliers().filter((s) => {
      const matchesSearch =
        !q ||
        this.supplierNumber(s).toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        (s.email ?? '').toLowerCase().includes(q) ||
        (s.phone ?? '').toLowerCase().includes(q);
      const matchesType = !type || s.supplierType === type;
      const matchesVat =
        !vat || (vat === 'registered' ? s.vatRegistered : !s.vatRegistered);
      const matchesTerm = !term || s.paymentTerm === term;
      const matchesAdvanced =
        !advanced || this.querySvc.evaluateGroup(advanced, s, (x) => this.supplierNumber(x));

      return matchesSearch && matchesType && matchesVat && matchesTerm && matchesAdvanced;
    });

    const dir = this.sortAsc() ? 1 : -1;

    return [...filtered].sort((a, b) => dir * a.name.localeCompare(b.name));
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredSuppliers().length / this.pageSize())),
  );

  safePage = computed(() => Math.min(this.page(), this.totalPages()));

  pagedSuppliers = computed(() => {
    const start = (this.safePage() - 1) * this.pageSize();

    return this.filteredSuppliers().slice(start, start + this.pageSize());
  });

  rangeStart = computed(() =>
    this.filteredSuppliers().length === 0 ? 0 : (this.safePage() - 1) * this.pageSize() + 1,
  );

  rangeEnd = computed(() =>
    Math.min(this.safePage() * this.pageSize(), this.filteredSuppliers().length),
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

  // Category view switcher: applies immediately (All / Business / Individual)
  changeType(value: string): void {
    this.draftType.set(value);
    this.appliedFilters.update((f) => ({ ...f, type: value }));
    this.selected.set(null);
    this.page.set(1);
    this.scrollToTop();
  }

  find(): void {
    this.appliedFilters.set({
      search: this.draftSearch(),
      type: this.draftType(),
      vat: this.draftVat(),
      term: this.draftTerm(),
    });
    this.page.set(1);
    this.scrollToTop();
  }

  reset(): void {
    this.draftSearch.set('');
    this.draftType.set('');
    this.draftVat.set('');
    this.draftTerm.set('');
    this.appliedFilters.set({ search: '', type: '', vat: '', term: '' });
    this.advancedQuery.set(null);
    this.activeSavedId.set(null);
    this.page.set(1);
    this.scrollToTop();
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
    this.scrollToTop();
  }

  // Scrolls the table rows back to the top (the panel above never moves)
  private scrollToTop(): void {
    this.tableScroll()?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ACTIONS: SELECTION + TOOLBAR

  isSelected(supplier: SupplierModel): boolean {
    return this.selected() === supplier;
  }

  toggleRow(supplier: SupplierModel): void {
    this.selected.set(this.selected() === supplier ? null : supplier);
  }

  clearSelection(): void {
    this.selected.set(null);
  }

  selectFirst(): void {
    if (this.selected()) {
      this.selected.set(null);
      return;
    }

    this.selected.set(this.pagedSuppliers()[0] ?? null);
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
    this.actionsOpen.set(false);
    this.savedOpen.set(false);
    this.moreOpen.update((v) => !v);
  }

  closeMore(): void {
    this.moreOpen.set(false);
  }

  toggleActions(event: Event): void {
    event.stopPropagation();
    this.moreOpen.set(false);
    this.savedOpen.set(false);
    this.actionsOpen.update((v) => !v);
  }

  closeMenus(): void {
    this.moreOpen.set(false);
    this.actionsOpen.set(false);
    this.savedOpen.set(false);
  }

  // Escape closes only the top-most open modal
  closeTopModal(): void {
    if (this.showAdvanced()) return this.closeAdvanced();
    if (this.deletingSupplier()) return this.closeDelete();
    if (this.editingSupplier()) return this.closeEdit();
    if (this.showImport()) return this.closeImport();
    if (this.showStatement()) return this.closeStatement();
    if (this.showForm()) return this.closeForm();
  }

  print(): void {
    window.print();
  }

  // ACTIONS: ADVANCED QUERY

  openAdvanced(): void {
    this.closeMenus();
    this.showAdvanced.set(true);
  }

  closeAdvanced(): void {
    this.showAdvanced.set(false);
  }

  runAdvanced(run: QueryRun): void {
    const active = this.querySvc.countActive(run.query) > 0;

    this.advancedQuery.set(active ? run.query : null);
    this.activeSavedId.set(active ? run.savedId : null);
    this.page.set(1);
    this.closeAdvanced();
    this.scrollToTop();
  }

  clearAdvanced(): void {
    this.advancedQuery.set(null);
    this.activeSavedId.set(null);
    this.page.set(1);
  }

  // ACTIONS: SAVED QUERIES

  toggleSaved(event: Event): void {
    event.stopPropagation();
    this.moreOpen.set(false);
    this.actionsOpen.set(false);
    this.savedOpen.update((v) => !v);
  }

  applySaved(id: string): void {
    const saved = this.savedQueries().find((s) => s.id === id);

    if (!saved) return;

    this.advancedQuery.set(structuredClone(saved.query));
    this.activeSavedId.set(saved.id);
    this.savedOpen.set(false);
    this.page.set(1);
    this.scrollToTop();
  }

  // "All suppliers" entry: drops the advanced/saved query
  clearSaved(): void {
    this.clearAdvanced();
    this.savedOpen.set(false);
    this.scrollToTop();
  }

  deleteSaved(id: string, event: Event): void {
    event.stopPropagation();
    this.querySvc.deleteSaved(id);

    if (this.activeSavedId() === id) {
      this.clearAdvanced();
    }
  }

  // ACTIONS: ADD

  openForm(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  addSupplier(data: NewSupplierFormModel): void {
    const id = this.formatId(this.nextIdNumber());

    this.suppliers.update((list) => [{ id, status: 'Pending Approval' as SupplierStatus, ...data }, ...list]);
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

  importSuppliers(rows: NewSupplierFormModel[]): void {
    let next = this.nextIdNumber();
    const created: SupplierModel[] = rows.map((r) => ({
      id: this.formatId(next++),
      status: 'Pending Approval' as SupplierStatus,
      ...r,
    }));

    this.suppliers.update((list) => [...list, ...created]);
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

  openEdit(supplier: SupplierModel): void {
    this.editingSupplier.set(supplier);
  }

  closeEdit(): void {
    this.editingSupplier.set(null);
  }

  updateSupplier(updated: SupplierModel): void {
    const original = this.editingSupplier();
    const merged: SupplierModel = {
      ...updated,
      status: updated.status ?? original?.status ?? 'Pending Approval',
    };

    // Match by reference (not id) so duplicate mock ids can't update the wrong rows
    this.suppliers.update((list) => list.map((s) => (s === original ? merged : s)));

    if (this.selected() === original) {
      this.selected.set(merged);
    }

    this.closeEdit();
  }

  // ACTIONS: DELETE

  openDelete(supplier: SupplierModel): void {
    this.deletingSupplier.set(supplier);
  }

  closeDelete(): void {
    this.deletingSupplier.set(null);
  }

  confirmDelete(): void {
    const target = this.deletingSupplier();

    this.suppliers.update((list) => list.filter((s) => s !== target));

    if (this.selected() === target) {
      this.selected.set(null);
    }

    this.closeDelete();
  }

  // ID HELPERS (max-based so deletes and imports never produce duplicate ids)

  private nextIdNumber(): number {
    return Math.max(0, ...this.suppliers().map((s) => Number(s.id.replace(/\D/g, '')))) + 1;
  }

  private formatId(n: number): string {
    return `SUP-${String(n).padStart(3, '0')}`;
  }

  // DISPLAY HELPERS

  isBusiness(s: SupplierModel): boolean {
    return s.supplierType === 'Business';
  }

  formatMoney(amount: number, currency: string): string {
    const symbol = CURRENCY_SYMBOL[currency] ?? currency;

    return `${symbol} ${amount.toLocaleString('en-US')}`;
  }

  // SU-0004 (derived from id)
  supplierNumber(s: SupplierModel): string {
    return `SU-${s.id.replace(/\D/g, '').padStart(4, '0')}`;
  }

  statusClass(status: SupplierStatus | undefined): string {
    return STATUS_STYLES[status ?? 'Pending Approval'];
  }
}