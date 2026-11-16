import { Component, computed, input, output, signal } from '@angular/core';
import {
  NewSupplierFormModel,
  SUPPLIER_CURRENCIES,
  SUPPLIER_TYPES,
  SupplierModel,
} from '../../../../models/suppliers/supplier-model';

type ImportFormat = 'csv' | 'xlsx';

interface ParsedRow {
  rowNumber: number;
  raw: Record<string, string>;
  data: NewSupplierFormModel | null;
  errors: string[];
}

interface ImportResult {
  fileName: string;
  rows: ParsedRow[];
}

const PAYMENT_TERMS = ['Cash on Delivery', 'Custom Term'];

const CURRENCY_SYMBOL: Record<string, string> = {
  ZAR: 'R',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const HEADERS = [
  'Name',
  'Address',
  'Email',
  'Phone',
  'Supplier Type',
  'Contact First Name',
  'Contact Last Name',
  'Contact Email',
  'VAT Registered',
  'VAT Number',
  'Credit Limit',
  'Payment Term',
  'Payment Days',
  'Currency',
  'Bank Name',
  'Bank Account Number',
  'Branch Code',
  'Lead Time (Days)',
];

// One business and one individual example so the blank contact/VAT cells are clear
const SAMPLE_ROWS = [
  [
    'Acme Components',
    '1 Main Road, Sandton, Johannesburg',
    'accounts@acme.co.za',
    '011 555 0100',
    'Business',
    'Thabo',
    'Mabena',
    'thabo@acme.co.za',
    'Yes',
    '4123456789',
    '170000',
    'Custom Term',
    '30',
    'ZAR',
    'FNB',
    '62845120934',
    '250655',
    '7',
  ],
  [
    'Lerato Khumalo',
    '9 Protea Avenue, Fourways, Johannesburg',
    'lerato.khumalo@gmail.com',
    '083 555 0177',
    'Individual',
    '',
    '',
    '',
    'No',
    '',
    '8000',
    'Cash on Delivery',
    '',
    'ZAR',
    'Capitec',
    '1523648790',
    '470010',
    '3',
  ],
];

const REQUIRED_KEYS = [
  'name',
  'address',
  'suppliertype',
  'vatregistered',
  'creditlimit',
  'paymentterm',
  'currency',
  'bankname',
  'bankaccountnumber',
  'branchcode',
  'leadtimedays',
];

// Columns that may be missing from the file entirely (treated as blank)
const OPTIONAL_KEYS = [
  'email',
  'phone',
  'contactfirstname',
  'contactlastname',
  'contactemail',
  'vatnumber',
  'paymentdays',
];

const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseCsv(input: string): string[][] {
  let text = input;

  if (text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
  }

  // Excel in some locales (including en-ZA) saves CSV with ';' as the separator
  const firstLine = text.split(/\r?\n/)[0] ?? '';
  const delimiter =
    (firstLine.match(/;/g) ?? []).length > (firstLine.match(/,/g) ?? []).length ? ';' : ',';

  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delimiter) {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') {
        i++;
      }
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }

  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function toCsv(rows: string[][]): string {
  const q = (v: string) => `"${v.replace(/"/g, '""')}"`;

  return '\uFEFF' + rows.map((r) => r.map(q).join(',')).join('\r\n');
}

@Component({
  selector: 'app-import-suppliers-form',
  templateUrl: './import-suppliers-form.html',
})
export class ImportSuppliersForm {
  existing = input<SupplierModel[]>([]);
  closed = output<void>();
  imported = output<NewSupplierFormModel[]>();

  format = signal<ImportFormat>('csv');
  result = signal<ImportResult | null>(null);
  fileError = signal('');
  busy = signal(false);

  validRows = computed(() => (this.result()?.rows ?? []).filter((r) => r.data));
  errorRows = computed(() => (this.result()?.rows ?? []).filter((r) => !r.data));

  setFormat(format: ImportFormat): void {
    if (this.format() === format) {
      return;
    }

    this.format.set(format);
    this.clearFile();
  }

  clearFile(): void {
    this.result.set(null);
    this.fileError.set('');
  }

  // TEMPLATE DOWNLOAD

  async downloadTemplate(): Promise<void> {
    if (this.format() === 'csv') {
      this.download(
        new Blob([toCsv([HEADERS, ...SAMPLE_ROWS])], { type: 'text/csv;charset=utf-8' }),
        'suppliers-import-template.csv',
      );
      return;
    }

    const XLSX = await import('xlsx');
    const sheet = XLSX.utils.aoa_to_sheet([HEADERS, ...SAMPLE_ROWS]);

    sheet['!cols'] = HEADERS.map((h) => ({ wch: Math.max(h.length + 2, 16) }));

    const book = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(book, sheet, 'Suppliers');

    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' });

    this.download(
      new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'suppliers-import-template.xlsx',
    );
  }

  private download(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // FILE UPLOAD + PARSING

  async onFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    input.value = '';

    if (!file) {
      return;
    }

    this.clearFile();

    if (!file.name.toLowerCase().endsWith('.' + this.format())) {
      this.fileError.set(`Please choose a .${this.format()} file.`);
      return;
    }

    this.busy.set(true);

    try {
      const table =
        this.format() === 'csv' ? parseCsv(await file.text()) : await this.readXlsx(file);

      this.result.set({ fileName: file.name, rows: this.validate(table) });
    } catch (e) {
      this.fileError.set(e instanceof Error ? e.message : 'The file could not be read.');
    } finally {
      this.busy.set(false);
    }
  }

  private async readXlsx(file: File): Promise<string[][]> {
    const XLSX = await import('xlsx');
    const book = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const sheet = book.Sheets[book.SheetNames[0]];

    if (!sheet) {
      throw new Error('The workbook has no sheets.');
    }

    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      raw: false,
      defval: '',
    });

    return rows.map((r) => r.map((c) => String(c ?? '')));
  }

  private validate(table: string[][]): ParsedRow[] {
    if (table.length === 0) {
      throw new Error('The file is empty.');
    }

    const keys = table[0].map(normalise);
    const missing = REQUIRED_KEYS.filter((k) => !keys.includes(k));

    if (missing.length) {
      const names = missing.map((k) => HEADERS.find((h) => normalise(h) === k));

      throw new Error(`Missing required column(s): ${names.join(', ')}. Download the template to see the expected headers.`);
    }

    const seenNames = new Set(this.existing().map((s) => s.name.trim().toLowerCase()));
    const seenVat = new Set(
      this.existing()
        .filter((s) => s.vatRegistered && s.vatNumber)
        .map((s) => s.vatNumber.trim()),
    );
    const rows: ParsedRow[] = [];

    table.slice(1).forEach((cells, i) => {
      if (cells.every((c) => c.trim() === '')) {
        return;
      }

      const raw: Record<string, string> = {};

      keys.forEach((k, idx) => (raw[k] = (cells[idx] ?? '').trim()));
      OPTIONAL_KEYS.forEach((k) => (raw[k] ??= ''));

      const { data, errors } = this.validateRow(raw, seenNames, seenVat);

      if (data) {
        seenNames.add(data.name.toLowerCase());

        if (data.vatRegistered) {
          seenVat.add(data.vatNumber);
        }
      }

      rows.push({ rowNumber: i + 2, raw, data: errors.length ? null : data, errors });
    });

    if (rows.length === 0) {
      throw new Error('The file has headers but no supplier rows.');
    }

    return rows;
  }

  private validateRow(
    raw: Record<string, string>,
    seenNames: Set<string>,
    seenVat: Set<string>,
  ): { data: NewSupplierFormModel; errors: string[] } {
    const errors: string[] = [];
    const need = (key: string, label: string) => {
      if (!raw[key]) {
        errors.push(`${label} is required`);
      }
    };

    need('name', 'Name');
    need('address', 'Address');
    need('bankname', 'Bank Name');

    const supplierType = SUPPLIER_TYPES.find(
      (t) => t.toLowerCase() === raw['suppliertype'].toLowerCase(),
    );

    if (!supplierType) {
      errors.push(`Supplier Type must be one of: ${SUPPLIER_TYPES.join(', ')}`);
    }

    const individual = supplierType === 'Individual';
    const business = supplierType === 'Business';

    // Individual suppliers: name is "First Last" and their own email/phone are required
    if (individual && raw['name'] && raw['name'].split(/\s+/).length < 2) {
      errors.push('Name must be first name and surname for an Individual supplier');
    }

    if (individual) {
      need('email', 'Email');
      need('phone', 'Phone');
    }

    if (raw['email'] && !EMAIL_RE.test(raw['email'])) {
      errors.push('Email is not valid');
    }

    // Business suppliers: a key point of contact is required
    if (business) {
      need('contactfirstname', 'Contact First Name');
      need('contactlastname', 'Contact Last Name');

      if (!raw['contactemail']) {
        errors.push('Contact Email is required');
      } else if (!EMAIL_RE.test(raw['contactemail'])) {
        errors.push('Contact Email is not valid');
      }
    }

    let vatRegistered = false;

    if (/^(yes|y|true|1)$/i.test(raw['vatregistered'])) {
      vatRegistered = true;
    } else if (!/^(no|n|false|0)$/i.test(raw['vatregistered']) && !(individual && !raw['vatregistered'])) {
      errors.push('VAT Registered must be Yes or No');
    }

    if (individual && vatRegistered) {
      errors.push('Individual suppliers cannot be VAT registered');
    }

    const vatNumber = raw['vatnumber'].replace(/\s/g, '');

    if (vatRegistered && !individual && !/^\d{10}$/.test(vatNumber)) {
      errors.push('VAT Number must be 10 digits when VAT registered');
    }

    const creditLimit = Number(raw['creditlimit'].replace(/[^\d.\-]/g, ''));

    if (!raw['creditlimit'] || Number.isNaN(creditLimit) || creditLimit < 0) {
      errors.push('Credit Limit must be a number of 0 or more');
    }

    const currency = SUPPLIER_CURRENCIES.find((c) => c === raw['currency'].toUpperCase());

    if (!currency) {
      errors.push(`Currency must be one of: ${SUPPLIER_CURRENCIES.join(', ')}`);
    }

    const paymentTerm = PAYMENT_TERMS.find(
      (t) => t.toLowerCase() === raw['paymentterm'].toLowerCase(),
    );
    let paymentDays: number | null = null;

    if (!paymentTerm) {
      errors.push(`Payment Term must be one of: ${PAYMENT_TERMS.join(', ')}`);
    } else if (paymentTerm === 'Custom Term') {
      const days = Number(raw['paymentdays']);

      if (!Number.isInteger(days) || days < 1 || days > 365) {
        errors.push('Payment Days must be a whole number from 1 to 365 for Custom Term');
      } else {
        paymentDays = days;
      }
    }

    const accountNumber = raw['bankaccountnumber'].replace(/\s/g, '');

    if (!/^\d{6,20}$/.test(accountNumber)) {
      errors.push('Bank Account Number must be 6 to 20 digits');
    }

    const branchCode = raw['branchcode'].replace(/\s/g, '');

    if (!/^\d{4,10}$/.test(branchCode)) {
      errors.push('Branch Code must be 4 to 10 digits');
    }

    const leadTime = Number(raw['leadtimedays']);

    if (!raw['leadtimedays'] || !Number.isInteger(leadTime) || leadTime < 1 || leadTime > 365) {
      errors.push('Lead Time must be a whole number of days from 1 to 365');
    }

    const name = raw['name'].toLowerCase();

    if (name && seenNames.has(name)) {
      errors.push('Name already exists');
    }

    if (vatRegistered && vatNumber && seenVat.has(vatNumber)) {
      errors.push('VAT Number already exists');
    }

    const data = {
      supplierType: supplierType ?? raw['suppliertype'],
      name: raw['name'],
      address: raw['address'],
      email: raw['email'],
      phone: raw['phone'],
      // Individual suppliers have no key contact and no VAT entity
      contactFirstName: business ? raw['contactfirstname'] : '',
      contactLastName: business ? raw['contactlastname'] : '',
      contactEmail: business ? raw['contactemail'] : '',
      vatRegistered: vatRegistered && !individual,
      vatNumber: vatRegistered && !individual ? vatNumber : '',
      creditLimit: Number.isNaN(creditLimit) ? 0 : creditLimit,
      paymentTerm: paymentTerm ?? raw['paymentterm'],
      paymentDays,
      currency: currency ?? raw['currency'],
      bankName: raw['bankname'],
      bankAccountNumber: accountNumber,
      branchCode,
      leadTimeDays: Number.isNaN(leadTime) ? 0 : leadTime,
    } as NewSupplierFormModel;

    return { data, errors };
  }

  // SUBMIT

  submit(): void {
    const rows = this.validRows().map((r) => r.data as NewSupplierFormModel);

    if (rows.length) {
      this.imported.emit(rows);
    }
  }

  formatMoney(amount: number, currency: string): string {
    const symbol = CURRENCY_SYMBOL[currency] ?? currency;

    return `${symbol} ${amount.toLocaleString('en-US')}`;
  }
}