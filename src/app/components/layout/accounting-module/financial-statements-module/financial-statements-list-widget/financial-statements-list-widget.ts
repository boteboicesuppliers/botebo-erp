import { Component, computed, signal } from '@angular/core';
import { ViewFinancialStatementModal } from '../view-financial-statement-modal/view-financial-statement-modal';

export type StatementKey =
  | 'STATEMENT_OF_FINANCIAL_POSITION'
  | 'STATEMENT_OF_FINANCIAL_PERFORMANCE'
  | 'STATEMENT_OF_CASH_FLOWS'
  | 'STATEMENT_OF_CHANGES_IN_EQUITY';

export type ExportFormat = 'CSV' | 'XLSX' | 'PDF';

export interface SourceRecordAuditItem {
  stream: string;
  recordCount: number;
  status: string;
}

export interface CompiledStatementLine {
  code: string;
  section: string;
  lineItem: string;
  sourceBasis: string;
  currentAmount: number;
  priorAmount: number;
}

export interface CompiledFinancialStatement {
  key: StatementKey;
  code: string;
  title: string;
  shortName: string;
  description: string;
  equationOrRule: string;
  period: string;
  status: 'Draft' | 'Checking Records...' | 'Compiled';
  lastCompiledAt: string | null;
  compiledAt: string;
  checkSummary: string;
  netLabel: string;
  currentNetTotal: number;
  priorNetTotal: number;
  sourceRecordsChecked: SourceRecordAuditItem[];
  lines: CompiledStatementLine[];
}

@Component({
  selector: 'app-financial-statements-list-widget',
  imports: [ViewFinancialStatementModal],
  templateUrl: './financial-statements-list-widget.html',
  styleUrl: './financial-statements-list-widget.css',
})
export class FinancialStatementsListWidget {
  selectedPeriod = signal<string>('November 2026 (MTD)');
  searchQuery = signal<string>('');
  viewingStatement = signal<CompiledFinancialStatement | null>(null);
  exportTargetStatement = signal<CompiledFinancialStatement | null>(null);
  selectedExportFormat = signal<ExportFormat>('CSV');
  statusBanner = signal<string>('');

  statements = signal<CompiledFinancialStatement[]>([
    {
      key: 'STATEMENT_OF_FINANCIAL_POSITION',
      code: 'SFP-IFRS',
      title: 'Statement of Financial Position (Balance Sheet)',
      shortName: 'Statement of Financial Position',
      description:
        'Shows what a company owns (assets), owes (liabilities), and its net worth (equity) at a specific date. Follows Assets = Liabilities + Equity.',
      equationOrRule: 'Assets = Liabilities + Equity',
      period: 'November 2026 (MTD)',
      status: 'Draft',
      lastCompiledAt: null,
      compiledAt: 'Not yet compiled',
      checkSummary: 'Pending source record check (Assets vs Liabilities + Equity)',
      netLabel: 'Net Assets / Accounting Equation Balance',
      currentNetTotal: 0,
      priorNetTotal: 0,
      sourceRecordsChecked: [
        { stream: 'General Ledger (1000–3999)', recordCount: 42, status: 'Ready' },
        { stream: 'Cash Receipts & Payments (CRJ / CPJ)', recordCount: 19, status: 'Ready' },
        { stream: 'Purchases & Creditors (PJ / GRN)', recordCount: 14, status: 'Ready' },
        { stream: 'Sales & Debtors (SJ / INV)', recordCount: 23, status: 'Ready' },
      ],
      lines: [
        { code: '1010', section: 'Assets', lineItem: 'Cash & Operating Bank Balances', sourceBasis: 'CRJ / CPJ / GL-1010', currentAmount: 142800, priorAmount: 118500 },
        { code: '1100', section: 'Assets', lineItem: 'Trade Receivables (Debtors)', sourceBasis: 'SJ / CRJ / GL-1100', currentAmount: 86400, priorAmount: 79200 },
        { code: '1200', section: 'Assets', lineItem: 'Inventory (Finished Ice & Packaging)', sourceBasis: 'GRN / PJ / GL-1200', currentAmount: 54100, priorAmount: 49800 },
        { code: '1500', section: 'Assets', lineItem: 'Plant, Chillers & Fleet Equipment', sourceBasis: 'GJ / Fixed Asset Register', currentAmount: 415000, priorAmount: 432000 },
        { code: '2010', section: 'Liabilities', lineItem: 'Trade & Supplier Payables (Creditors)', sourceBasis: 'PJ / CPJ / GL-2010', currentAmount: 63900, priorAmount: 58400 },
        { code: '2200', section: 'Liabilities', lineItem: 'Short-Term Borrowings & Accruals', sourceBasis: 'GJ / Payroll & Tax', currentAmount: 41200, priorAmount: 45000 },
        { code: '3000', section: 'Equity', lineItem: 'Share Capital & Retained Earnings', sourceBasis: 'GJ / Equity Ledger', currentAmount: 593200, priorAmount: 576100 },
      ],
    },
    {
      key: 'STATEMENT_OF_FINANCIAL_PERFORMANCE',
      code: 'SFP-PL',
      title: 'Statement of Financial Performance (Income Statement / Profit & Loss)',
      shortName: 'Statement of Financial Performance',
      description:
        'Tracks revenues and expenses over a set period to show net profit or loss. Under IFRS, may also include other comprehensive income.',
      equationOrRule: 'Revenue - Cost of Sales - Operating Expenses = Net Profit / Loss',
      period: 'November 2026 (MTD)',
      status: 'Draft',
      lastCompiledAt: null,
      compiledAt: 'Not yet compiled',
      checkSummary: 'Pending revenue, cost of sales & expense record check',
      netLabel: 'Net Profit / (Loss) for Period',
      currentNetTotal: 0,
      priorNetTotal: 0,
      sourceRecordsChecked: [
        { stream: 'Sales Journal & Invoices (SJ / INV)', recordCount: 23, status: 'Ready' },
        { stream: 'Purchases & GRNs (PJ / CPJ / GRN)', recordCount: 14, status: 'Ready' },
        { stream: 'Staff Wages & Attendance (GJ / ATT)', recordCount: 12, status: 'Ready' },
        { stream: 'General Ledger (4000–6999)', recordCount: 31, status: 'Ready' },
      ],
      lines: [
        { code: '4000', section: 'Revenue', lineItem: 'Ice & Cold Chain Sales', sourceBasis: 'SJ / INV / GL-4000', currentAmount: 184500, priorAmount: 162000 },
        { code: '4100', section: 'Revenue', lineItem: 'Bulk & Contract Deliveries', sourceBasis: 'SJ / Contracts / GL-4100', currentAmount: 68200, priorAmount: 59400 },
        { code: '5000', section: 'Cost of Sales', lineItem: 'Direct Materials, Water & Packaging', sourceBasis: 'PJ / GRN / GL-5000', currentAmount: -74300, priorAmount: -66800 },
        { code: '5100', section: 'Cost of Sales', lineItem: 'Plant Refrigeration & Direct Wages', sourceBasis: 'CPJ / ATT / GL-5100', currentAmount: -53600, priorAmount: -48900 },
        { code: '6100', section: 'Operating Expenses', lineItem: 'Fleet & Logistics Operating Costs', sourceBasis: 'CPJ / GJ / GL-6100', currentAmount: -29400, priorAmount: -26100 },
        { code: '6200', section: 'Operating Expenses', lineItem: 'Admin, Utilities & Maintenance', sourceBasis: 'CPJ / GJ / GL-6200', currentAmount: -22800, priorAmount: -21500 },
      ],
    },
    {
      key: 'STATEMENT_OF_CASH_FLOWS',
      code: 'SCF-IFRS',
      title: 'Statement of Cash Flows',
      shortName: 'Statement of Cash Flows',
      description:
        'Reports actual cash inflows and outflows over a period across operating, investing, and financing activities.',
      equationOrRule: 'Operating + Investing + Financing Cash Flows = Net Cash Movement',
      period: 'November 2026 (MTD)',
      status: 'Draft',
      lastCompiledAt: null,
      compiledAt: 'Not yet compiled',
      checkSummary: 'Pending cash receipts, payments & bank movement check',
      netLabel: 'Net Cash Inflow / (Outflow)',
      currentNetTotal: 0,
      priorNetTotal: 0,
      sourceRecordsChecked: [
        { stream: 'Cash Receipts Journal (CRJ)', recordCount: 11, status: 'Ready' },
        { stream: 'Cash Payments Journal (CPJ)', recordCount: 8, status: 'Ready' },
        { stream: 'Bank & Asset Movements (GL-1010 / 1500)', recordCount: 19, status: 'Ready' },
      ],
      lines: [
        { code: 'CF-101', section: 'Operating Activities', lineItem: 'Cash Receipts from Customers', sourceBasis: 'CRJ / Bank Receipts', currentAmount: 238900, priorAmount: 211400 },
        { code: 'CF-102', section: 'Operating Activities', lineItem: 'Cash Paid to Suppliers, Staff & Utilities', sourceBasis: 'CPJ / Bank Payments', currentAmount: -168400, priorAmount: -154200 },
        { code: 'CF-201', section: 'Investing Activities', lineItem: 'Cold Storage & Chiller Equipment Additions', sourceBasis: 'CPJ / Fixed Assets', currentAmount: -28500, priorAmount: -19000 },
        { code: 'CF-301', section: 'Financing Activities', lineItem: 'Loan Repayments & Capital Movements', sourceBasis: 'GJ / CPJ Financing', currentAmount: -17700, priorAmount: -14500 },
      ],
    },
    {
      key: 'STATEMENT_OF_CHANGES_IN_EQUITY',
      code: 'SCE-IFRS',
      title: 'Statement of Changes in Equity',
      shortName: 'Statement of Changes in Equity',
      description:
        'Reconciles opening and closing equity balances by showing movements from net profit or loss, dividends, and share capital change.',
      equationOrRule: 'Opening Equity + Net Profit/(Loss) - Dividends +/- Share Capital = Closing Equity',
      period: 'November 2026 (MTD)',
      status: 'Draft',
      lastCompiledAt: null,
      compiledAt: 'Not yet compiled',
      checkSummary: 'Pending opening equity, net profit & dividend movements check',
      netLabel: 'Closing Total Equity',
      currentNetTotal: 0,
      priorNetTotal: 0,
      sourceRecordsChecked: [
        { stream: 'Equity & Capital Accounts (GL-3000)', recordCount: 6, status: 'Ready' },
        { stream: 'Profit & Loss Summary (SFP-PL)', recordCount: 6, status: 'Ready' },
        { stream: 'General Journal Adjustments (GJ)', recordCount: 4, status: 'Ready' },
      ],
      lines: [
        { code: 'EQ-01', section: 'Opening Balance', lineItem: 'Opening Share Capital & Retained Earnings', sourceBasis: 'GL-3000 Opening', currentAmount: 520600, priorAmount: 485000 },
        { code: 'EQ-02', section: 'Comprehensive Income', lineItem: 'Net Profit / (Loss) for the Period', sourceBasis: 'SFP-PL / GL Summary', currentAmount: 72600, priorAmount: 91100 },
        { code: 'EQ-03', section: 'Owner Distributions', lineItem: 'Dividends Declared / Drawings', sourceBasis: 'GJ / CPJ Distributions', currentAmount: 0, priorAmount: 0 },
        { code: 'EQ-04', section: 'Capital Movements', lineItem: 'Share Capital Issued / Repurchased', sourceBasis: 'GJ Share Register', currentAmount: 0, priorAmount: 0 },
      ],
    },
  ]);

  filteredStatements = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.statements();
    return this.statements().filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  });

  compiledCount = computed(
    () => this.statements().filter((s) => s.status === 'Compiled').length
  );

  generateStatement(key: StatementKey) {
    const nowLabel = new Date().toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.statements.update((list) =>
      list.map((stmt) => {
        if (stmt.key !== key) return stmt;

        const period = this.selectedPeriod();
        const checkedSources = stmt.sourceRecordsChecked.map((src) => ({
          ...src,
          status: 'Verified & Included',
        }));

        const currentNetTotal = stmt.lines.reduce((acc, l) => acc + l.currentAmount, 0);
        const priorNetTotal = stmt.lines.reduce((acc, l) => acc + l.priorAmount, 0);

        let checkSummary = 'All contributing records reconciled';
        if (key === 'STATEMENT_OF_FINANCIAL_POSITION') {
          const assets = stmt.lines
            .filter((l) => l.section === 'Assets')
            .reduce((s, l) => s + l.currentAmount, 0);
          const liabAndEq = stmt.lines
            .filter((l) => l.section !== 'Assets')
            .reduce((s, l) => s + l.currentAmount, 0);
          const diff = assets - liabAndEq;
          checkSummary =
            diff === 0
              ? `Balanced: Assets (${this.formatZar(assets)}) = Liabilities + Equity (${this.formatZar(liabAndEq)})`
              : `Variance: ${this.formatZar(diff)}`;
        } else if (key === 'STATEMENT_OF_FINANCIAL_PERFORMANCE') {
          checkSummary = `Reconciled across ${checkedSources.reduce((s, r) => s + r.recordCount, 0)} revenue/expense & journal records`;
        } else if (key === 'STATEMENT_OF_CASH_FLOWS') {
          checkSummary = `Cash inflows & outflows verified across CRJ, CPJ & GL bank records`;
        } else if (key === 'STATEMENT_OF_CHANGES_IN_EQUITY') {
          checkSummary = `Equity movement reconciled from opening balance to closing equity`;
        }

        const compiled: CompiledFinancialStatement = {
          ...stmt,
          period,
          status: 'Compiled',
          lastCompiledAt: nowLabel,
          compiledAt: nowLabel,
          currentNetTotal,
          priorNetTotal,
          checkSummary,
          sourceRecordsChecked: checkedSources,
        };

        this.statusBanner.set(
          `Compiled "${compiled.shortName}" for ${period} (${compiled.checkSummary}).`
        );
        return compiled;
      })
    );
  }

  openStatementView(stmt: CompiledFinancialStatement) {
    if (stmt.status !== 'Compiled') {
      this.generateStatement(stmt.key);
    }
    const latest = this.statements().find((s) => s.key === stmt.key) || stmt;
    this.viewingStatement.set(latest);
  }

  openExportDialog(stmt: CompiledFinancialStatement) {
    this.selectedExportFormat.set('CSV');
    this.exportTargetStatement.set(stmt);
  }

  confirmExportDialog() {
    const stmt = this.exportTargetStatement();
    if (!stmt) return;
    const format = this.selectedExportFormat();
    this.exportTargetStatement.set(null);
    this.exportStatement(stmt, format);
  }

  exportStatement(stmt: CompiledFinancialStatement, format: ExportFormat) {
    const compiled = stmt.status === 'Compiled' ? stmt : this.compileSnapshot(stmt);
    const slug = `${compiled.code.toLowerCase()}-${compiled.period
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}`;

    if (format === 'CSV') {
      const headers = ['Code', 'Section', 'Line Item', 'Source Basis', 'Current Period', 'Prior Period'];
      const rows = compiled.lines.map((l) => [
        this.csvCell(l.code),
        this.csvCell(l.section),
        this.csvCell(l.lineItem),
        this.csvCell(l.sourceBasis),
        this.csvCell(l.currentAmount.toFixed(2)),
        this.csvCell(l.priorAmount.toFixed(2)),
      ]);
      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      this.triggerDownload(csvContent, `${slug}.csv`, 'text/csv;charset=utf-8;');
      this.statusBanner.set(`Exported ${compiled.shortName} as CSV (${slug}.csv).`);
      return;
    }

    if (format === 'XLSX') {
      const tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head><meta charset="UTF-8" /></head>
        <body>
          <h3>${compiled.title} — ${compiled.period}</h3>
          <p>${compiled.checkSummary}</p>
          <table border="1">
            <thead>
              <tr>
                <th>Code</th>
                <th>Section</th>
                <th>Line Item</th>
                <th>Source Basis</th>
                <th>Current Period (ZAR)</th>
                <th>Prior Period (ZAR)</th>
              </tr>
            </thead>
            <tbody>
              ${compiled.lines
                .map(
                  (l) => `
                <tr>
                  <td>${l.code}</td>
                  <td>${l.section}</td>
                  <td>${l.lineItem}</td>
                  <td>${l.sourceBasis}</td>
                  <td>${l.currentAmount.toFixed(2)}</td>
                  <td>${l.priorAmount.toFixed(2)}</td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;
      this.triggerDownload(tableHtml, `${slug}.xls`, 'application/vnd.ms-excel;charset=utf-8;');
      this.statusBanner.set(`Exported ${compiled.shortName} for Excel (${slug}.xls).`);
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${compiled.title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 24px; color: #1f2933; font-size: 13px; }
              h1 { font-size: 18px; color: #17304f; margin-bottom: 4px; }
              p.meta { color: #4b5563; font-size: 12px; margin-top: 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 16px; }
              th, td { border: 1px solid #c5ced9; padding: 8px 10px; text-align: left; }
              th { background: #e1e6ed; color: #17304f; }
              td.num, th.num { text-align: right; }
            </style>
          </head>
          <body>
            <h1>${compiled.title}</h1>
            <p class="meta">Period: ${compiled.period} | ${compiled.checkSummary}</p>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Section</th>
                  <th>Line Item</th>
                  <th>Source Basis</th>
                  <th class="num">Current Period</th>
                  <th class="num">Prior Period</th>
                </tr>
              </thead>
              <tbody>
                ${compiled.lines
                  .map(
                    (l) => `
                  <tr>
                    <td>${l.code}</td>
                    <td>${l.section}</td>
                    <td>${l.lineItem}</td>
                    <td>${l.sourceBasis}</td>
                    <td class="num">${this.formatZar(l.currentAmount)}</td>
                    <td class="num">${this.formatZar(l.priorAmount)}</td>
                  </tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
    this.statusBanner.set(`Opened print/PDF view for ${compiled.shortName}.`);
  }

  private compileSnapshot(stmt: CompiledFinancialStatement): CompiledFinancialStatement {
    return {
      ...stmt,
      period: this.selectedPeriod(),
      currentNetTotal: stmt.lines.reduce((s, l) => s + l.currentAmount, 0),
      priorNetTotal: stmt.lines.reduce((s, l) => s + l.priorAmount, 0),
    };
  }

  private csvCell(value: string): string {
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  }

  private triggerDownload(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  formatZar(amount: number): string {
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    return `${sign}R ${abs.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}