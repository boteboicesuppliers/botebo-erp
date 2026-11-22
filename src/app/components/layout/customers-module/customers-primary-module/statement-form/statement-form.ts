import { Component, computed, input, output, signal } from '@angular/core';
import { CustomerModel } from '../../../../models/contracts/customer-model';

type Scope = 'selected' | 'all';
type Period = 'this-month' | 'last-month' | 'last-3' | 'last-6' | 'ytd' | 'custom';
type StatementFormat = 'pdf' | 'csv' | 'xlsx';

interface StatementLine {
  date: string;
  reference: string;
  description: string;
  debit: number;
  credit: number;
}

interface DateRange {
  from: Date;
  to: Date;
}

@Component({
  selector: 'app-statement-form',
  templateUrl: './statement-form.html',
})
export class StatementForm {
  customers = input<CustomerModel[]>([]);
  selected = input<CustomerModel | null>(null);
  closed = output<void>();

  readonly periods: { value: Period; label: string }[] = [
    { value: 'this-month', label: 'This month' },
    { value: 'last-month', label: 'Last month' },
    { value: 'last-3', label: 'Last 3 months' },
    { value: 'last-6', label: 'Last 6 months' },
    { value: 'ytd', label: 'Year to date' },
    { value: 'custom', label: 'Custom range' },
  ];

  scopeChoice = signal<Scope | null>(null);
  period = signal<Period>('this-month');
  customFrom = signal('');
  customTo = signal('');
  format = signal<StatementFormat>('pdf');
  busy = signal(false);

  // Defaults to the selected customer when there is one, and falls back to "all" otherwise
  scope = computed<Scope>(() => {
    const choice = this.scopeChoice() ?? (this.selected() ? 'selected' : 'all');

    return choice === 'selected' && !this.selected() ? 'all' : choice;
  });

  targets = computed<CustomerModel[]>(() => {
    const sel = this.selected();

    return this.scope() === 'selected' && sel ? [sel] : this.customers();
  });

  range = computed<DateRange | null>(() => {
    const today = new Date();
    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const now = startOfDay(today);
    const y = now.getFullYear();
    const m = now.getMonth();

    switch (this.period()) {
      case 'this-month':
        return { from: new Date(y, m, 1), to: now };
      case 'last-month':
        return { from: new Date(y, m - 1, 1), to: new Date(y, m, 0) };
      case 'last-3':
        return { from: new Date(y, m - 3, now.getDate()), to: now };
      case 'last-6':
        return { from: new Date(y, m - 6, now.getDate()), to: now };
      case 'ytd':
        return { from: new Date(y, 0, 1), to: now };
      case 'custom': {
        if (!this.customFrom() || !this.customTo()) {
          return null;
        }

        const from = new Date(this.customFrom() + 'T00:00:00');
        const to = new Date(this.customTo() + 'T00:00:00');

        return from <= to ? { from, to } : null;
      }
    }
  });

  canGenerate = computed(() => this.range() !== null && this.targets().length > 0 && !this.busy());

  async generate(): Promise<void> {
    const range = this.range();
    const list = this.targets();

    if (!range || list.length === 0) {
      return;
    }

    this.busy.set(true);

    try {
      const stamp = this.fileStamp(range);
      const name = this.scope() === 'selected' ? list[0].id : 'all-customers';

      switch (this.format()) {
        case 'pdf':
          this.printStatements(list, range);
          break;
        case 'csv':
          this.download(
            new Blob([this.buildCsv(list, range)], { type: 'text/csv;charset=utf-8' }),
            `statement-${name}-${stamp}.csv`,
          );
          break;
        case 'xlsx':
          await this.downloadXlsx(list, range, `statement-${name}-${stamp}.xlsx`);
          break;
      }
    } finally {
      this.busy.set(false);
    }
  }

  // DATA
  // The customer model holds no invoices or payments, so there is nothing to list yet.
  // Replace this with a call to your ledger / invoice service once it exists.
  private linesFor(_customer: CustomerModel, _range: DateRange): StatementLine[] {
    return [];
  }

  private withBalance(lines: StatementLine[]): (StatementLine & { balance: number })[] {
    let balance = 0;

    return lines.map((l) => {
      balance += l.debit - l.credit;

      return { ...l, balance };
    });
  }

  // FORMATTING

  private fmtDate(d: Date): string {
    return d.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private fmtRange(r: DateRange): string {
    return `${this.fmtDate(r.from)} – ${this.fmtDate(r.to)}`;
  }

  private fmtRand(n: number): string {
    return 'R ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  private terms(c: CustomerModel): string {
    return c.paymentTerm === 'Custom Term' ? `${c.paymentDays} days` : c.paymentTerm;
  }

  private fileStamp(r: DateRange): string {
    const iso = (d: Date) =>
      `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;

    return `${iso(r.from)}-${iso(r.to)}`;
  }

  // CSV

  private buildCsv(list: CustomerModel[], range: DateRange): string {
    const q = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const header = [
      'Customer ID', 'Business Name', 'Period', 'Date', 'Reference', 'Description', 'Debit', 'Credit', 'Balance',
    ];
    const rows: (string | number)[][] = [header];

    for (const c of list) {
      const lines = this.withBalance(this.linesFor(c, range));

      if (lines.length === 0) {
        rows.push([c.id, c.businessName, this.fmtRange(range), '', '', 'No transactions in period', '', '', 0]);
        continue;
      }

      for (const l of lines) {
        rows.push([c.id, c.businessName, this.fmtRange(range), l.date, l.reference, l.description, l.debit, l.credit, l.balance]);
      }
    }

    return '\uFEFF' + rows.map((r) => r.map(q).join(',')).join('\r\n');
  }

  // XLSX (one sheet per customer)

  private async downloadXlsx(list: CustomerModel[], range: DateRange, fileName: string): Promise<void> {
    const XLSX = await import('xlsx');
    const book = XLSX.utils.book_new();

    for (const c of list) {
      const lines = this.withBalance(this.linesFor(c, range));
      const closing = lines.length ? lines[lines.length - 1].balance : 0;
      const aoa: (string | number)[][] = [
        ['Statement of Account'],
        ['Customer', c.businessName],
        ['Account', c.id],
        ['Address', c.address],
        ['Period', this.fmtRange(range)],
        ['Credit limit', this.fmtRand(c.creditLimit)],
        ['Payment term', this.terms(c)],
        [],
        ['Date', 'Reference', 'Description', 'Debit', 'Credit', 'Balance'],
        ...(lines.length
          ? lines.map((l) => [l.date, l.reference, l.description, l.debit, l.credit, l.balance])
          : [['', '', 'No transactions in period', '', '', 0]]),
        ['', '', 'Closing balance', '', '', closing],
      ];
      const sheet = XLSX.utils.aoa_to_sheet(aoa);

      sheet['!cols'] = [{ wch: 14 }, { wch: 16 }, { wch: 40 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
      XLSX.utils.book_append_sheet(book, sheet, c.id.slice(0, 31));
    }

    const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx' });

    this.download(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      fileName,
    );
  }

  // PDF (opens a print view; choose "Save as PDF" in the print dialog)

  private printStatements(list: CustomerModel[], range: DateRange): void {
    const esc = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const pages = list
      .map((c) => {
        const lines = this.withBalance(this.linesFor(c, range));
        const closing = lines.length ? lines[lines.length - 1].balance : 0;
        const body = lines.length
          ? lines
              .map(
                (l) =>
                  `<tr><td>${esc(l.date)}</td><td>${esc(l.reference)}</td><td>${esc(l.description)}</td><td class="n">${this.fmtRand(l.debit)}</td><td class="n">${this.fmtRand(l.credit)}</td><td class="n">${this.fmtRand(l.balance)}</td></tr>`,
              )
              .join('')
          : '<tr><td colspan="6" class="empty">No transactions in this period.</td></tr>';

        return `<section>
          <h1>Statement of Account</h1>
          <div class="meta">
            <div><strong>${esc(c.businessName)}</strong><br>${esc(c.address)}<br>Account: ${esc(c.id)}</div>
            <div>Period: ${esc(this.fmtRange(range))}<br>Credit limit: ${this.fmtRand(c.creditLimit)}<br>Payment term: ${esc(this.terms(c))}</div>
          </div>
          <table>
            <thead><tr><th>Date</th><th>Reference</th><th>Description</th><th class="n">Debit</th><th class="n">Credit</th><th class="n">Balance</th></tr></thead>
            <tbody>${body}</tbody>
            <tfoot><tr><td colspan="5">Closing balance</td><td class="n">${this.fmtRand(closing)}</td></tr></tfoot>
          </table>
        </section>`;
      })
      .join('');

    const win = window.open('', '_blank');

    if (!win) {
      alert('Your browser blocked the statement window. Allow pop-ups for this site and try again.');
      return;
    }

    win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Statement of Account</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #1f2933; margin: 24px; }
        h1 { font-size: 20px; color: #17304f; margin: 0 0 12px; }
        section { page-break-after: always; }
        section:last-child { page-break-after: auto; }
        .meta { display: flex; justify-content: space-between; gap: 24px; margin-bottom: 16px; line-height: 1.5; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #c5ced9; padding: 6px 8px; text-align: left; }
        th { background: #e1e6ed; font-weight: normal; }
        .n { text-align: right; }
        .empty { text-align: center; color: #4b5563; }
        tfoot td { font-weight: bold; }
      </style></head><body>${pages}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
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
}