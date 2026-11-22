import { Component, computed, input, output, signal } from '@angular/core';
import { CustomerModel } from '../../../../models/contracts/customer-model';
import { NewCustomerFormModel } from '../../../../models/contracts/new-customer-form-model';

type ImportFormat = 'csv' | 'xlsx';

interface ParsedRow {
  rowNumber: number;
  raw: Record<string, string>;
  data: NewCustomerFormModel | null;
  errors: string[];
}

interface ImportResult {
  fileName: string;
  rows: ParsedRow[];
}

const CUSTOMER_TYPES = ['Reseller', 'Food & Beverage', 'Retail/Forecourt'];
const PAYMENT_TERMS = ['Cash on Delivery', 'Custom Term'];

const HEADERS = [
  'Business Name',
  'Address',
  'Business Email',
  'Business Phone',
  'Customer Type',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'VAT Registered',
  'VAT Number',
  'Credit Limit',
  'Payment Term',
  'Payment Days',
];

const SAMPLE_ROW = [
  'Acme Trading',
  '1 Main Road, Sandton, Johannesburg',
  'accounts@acme.co.za',
  '011 555 0100',
  'Reseller',
  'Thabo',
  'Mabena',
  'thabo@acme.co.za',
  '011 555 0142',
  'Yes',
  '4123456789',
  '170000',
  'Custom Term',
  '30',
];

const REQUIRED_KEYS = [
  'businessname',
  'address',
  'customertype',
  'firstname',
  'lastname',
  'email',
  'phone',
  'vatregistered',
  'creditlimit',
  'paymentterm',
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
  selector: 'app-import-customers-form',
  templateUrl: './import-customers-form.html',
})
export class ImportCustomersForm {
  existing = input<CustomerModel[]>([]);
  closed = output<void>();
  imported = output<NewCustomerFormModel[]>();

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
        new Blob([toCsv([HEADERS, SAMPLE_ROW])], { type: 'text/csv;charset=utf-8' }),
        'customers-import-template.csv',
      );
      return;
    }

    const XLSX = await import('xlsx');
    const sheet = XLSX.utils.aoa_to_sheet([HEADERS, SAMPLE_ROW]);

    sheet['!cols'] = HEADERS.map((h) => ({ wch: Math.max(h.length + 2, 16) }));

    const book = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(book, sheet, 'Customers');

    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' });

    this.download(
      new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'customers-import-template.xlsx',
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

    const seenNames = new Set(this.existing().map((c) => c.businessName.trim().toLowerCase()));
    const seenVat = new Set(
      this.existing()
        .filter((c) => c.vatRegistered && c.vatNumber)
        .map((c) => c.vatNumber.trim()),
    );
    const rows: ParsedRow[] = [];

    table.slice(1).forEach((cells, i) => {
      if (cells.every((c) => c.trim() === '')) {
        return;
      }

      const raw: Record<string, string> = {};

      keys.forEach((k, idx) => (raw[k] = (cells[idx] ?? '').trim()));

      const { data, errors } = this.validateRow(raw, seenNames, seenVat);

      if (data) {
        seenNames.add(data.businessName.toLowerCase());

        if (data.vatRegistered) {
          seenVat.add(data.vatNumber);
        }
      }

      rows.push({ rowNumber: i + 2, raw, data: errors.length ? null : data, errors });
    });

    if (rows.length === 0) {
      throw new Error('The file has headers but no customer rows.');
    }

    return rows;
  }

  private validateRow(
    raw: Record<string, string>,
    seenNames: Set<string>,
    seenVat: Set<string>,
  ): { data: NewCustomerFormModel; errors: string[] } {
    const errors: string[] = [];
    const need = (key: string, label: string) => {
      if (!raw[key]) {
        errors.push(`${label} is required`);
      }
    };

    need('businessname', 'Business Name');
    need('address', 'Address');
    need('firstname', 'First Name');
    need('lastname', 'Last Name');
    need('phone', 'Phone');

    if (!raw['email']) {
      errors.push('Email is required');
    } else if (!EMAIL_RE.test(raw['email'])) {
      errors.push('Email is not valid');
    }

    if (raw['businessemail'] && !EMAIL_RE.test(raw['businessemail'])) {
      errors.push('Business Email is not valid');
    }

    const customerType = CUSTOMER_TYPES.find(
      (t) => t.toLowerCase() === raw['customertype'].toLowerCase(),
    );

    if (!customerType) {
      errors.push(`Customer Type must be one of: ${CUSTOMER_TYPES.join(', ')}`);
    }

    let vatRegistered = false;

    if (/^(yes|y|true|1)$/i.test(raw['vatregistered'])) {
      vatRegistered = true;
    } else if (!/^(no|n|false|0)$/i.test(raw['vatregistered'])) {
      errors.push('VAT Registered must be Yes or No');
    }

    const vatNumber = raw['vatnumber'].replace(/\s/g, '');

    if (vatRegistered && !/^\d{10}$/.test(vatNumber)) {
      errors.push('VAT Number must be 10 digits when VAT registered');
    }

    const creditLimit = Number(raw['creditlimit'].replace(/[^\d.\-]/g, ''));

    if (!raw['creditlimit'] || Number.isNaN(creditLimit) || creditLimit < 0) {
      errors.push('Credit Limit must be a number of 0 or more');
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

    const name = raw['businessname'].toLowerCase();

    if (name && seenNames.has(name)) {
      errors.push('Business Name already exists');
    }

    if (vatRegistered && vatNumber && seenVat.has(vatNumber)) {
      errors.push('VAT Number already exists');
    }

    const data = {
      businessName: raw['businessname'],
      contactFirstName: raw['firstname'],
      contactLastName: raw['lastname'],
      contactEmail: raw['email'],
      contactPhone: raw['phone'],
      address: raw['address'],
      vatRegistered,
      vatNumber: vatRegistered ? vatNumber : '',
      businessEmail: raw['businessemail'],
      businessPhone: raw['businessphone'],
      customerType: customerType ?? raw['customertype'],
      creditLimit: Number.isNaN(creditLimit) ? 0 : creditLimit,
      paymentTerm: paymentTerm ?? raw['paymentterm'],
      paymentDays,
    } as NewCustomerFormModel;

    return { data, errors };
  }

  // SUBMIT

  submit(): void {
    const rows = this.validRows().map((r) => r.data as NewCustomerFormModel);

    if (rows.length) {
      this.imported.emit(rows);
    }
  }

  formatRand(amount: number): string {
    return 'R ' + amount.toLocaleString('en-US');
  }
}