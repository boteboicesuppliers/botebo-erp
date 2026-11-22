import { Component, computed, signal } from '@angular/core';
import { DeleteSalesReportForm } from '../delete-sales-report-form/delete-sales-report-form';

export interface SalesReportRecord {
  id: string;
  reportCode: string;
  reportTitle: string;
  status: 'Ready' | 'Archived' | 'Pending Sync';
  accountScope: string;
  periodCovered: string;
  totalSalesDisplay: string;
  generatedDate: string;
  selected: boolean;
}

@Component({
  selector: 'app-sales-report-list-widget',
  imports: [DeleteSalesReportForm],
  templateUrl: './sales-report-list-widget.html',
  styleUrl: './sales-report-list-widget.css',
})
export class SalesReportListWidget {
  searchQuery = signal('');
  deletingReport = signal<SalesReportRecord | null>(null);
  pageSize = signal(8);
  currentPage = signal(1);

  reports = signal<SalesReportRecord[]>([
    {
      id: 'SR-1',
      reportCode: 'RPT-SLS-2026-1122',
      reportTitle: 'Daily Invoices & Sales Orders Summary',
      status: 'Ready',
      accountScope: 'All Customer Accounts',
      periodCovered: '2026-11-22',
      totalSalesDisplay: 'R 6,480',
      generatedDate: '2026-11-22',
      selected: false,
    },
    {
      id: 'SR-2',
      reportCode: 'RPT-SLS-2026-W47',
      reportTitle: 'Weekly Revenue & Contract Volume Report',
      status: 'Ready',
      accountScope: 'Hospitality & Retail Contracts',
      periodCovered: '2026-11-16 to 2026-11-22',
      totalSalesDisplay: 'R 42,530',
      generatedDate: '2026-11-22',
      selected: false,
    },
    {
      id: 'SR-3',
      reportCode: 'RPT-SLS-2026-10',
      reportTitle: 'Monthly Sales & Quotation Conversion Ledger',
      status: 'Archived',
      accountScope: 'All Customers',
      periodCovered: 'October 2026',
      totalSalesDisplay: 'R 168,900',
      generatedDate: '2026-11-01',
      selected: false,
    },
  ]);

  filteredReports = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.reports();
    if (!q) return list;
    return list.filter(
      (r) =>
        r.reportCode.toLowerCase().includes(q) ||
        r.reportTitle.toLowerCase().includes(q) ||
        r.accountScope.toLowerCase().includes(q) ||
        r.periodCovered.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  });

  totalPages = computed(() => {
    const size = Math.max(1, Number(this.pageSize()) || 8);
    return Math.max(1, Math.ceil(this.filteredReports().length / size));
  });

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, idx) => idx + 1)
  );

  pagedReports = computed(() => {
    const size = Math.max(1, Number(this.pageSize()) || 8);
    const page = Math.min(Math.max(1, this.currentPage()), this.totalPages());
    const start = (page - 1) * size;
    return this.filteredReports().slice(start, start + size);
  });

  rangeStart = computed(() => {
    if (this.filteredReports().length === 0) return 0;
    const size = Math.max(1, Number(this.pageSize()) || 8);
    const page = Math.min(Math.max(1, this.currentPage()), this.totalPages());
    return (page - 1) * size + 1;
  });

  rangeEnd = computed(() => {
    if (this.filteredReports().length === 0) return 0;
    const size = Math.max(1, Number(this.pageSize()) || 8);
    const page = Math.min(Math.max(1, this.currentPage()), this.totalPages());
    return Math.min(this.filteredReports().length, page * size);
  });

  selectedCount = computed(() => this.reports().filter((r) => r.selected).length);

  allVisibleSelected = computed(() => {
    const rows = this.pagedReports();
    return rows.length > 0 && rows.every((r) => r.selected);
  });

  toggleRowSelection(id: string): void {
    this.reports.update((list) =>
      list.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  }

  toggleSelectAllVisible(): void {
    const target = !this.allVisibleSelected();
    const visibleIds = new Set(this.pagedReports().map((r) => r.id));
    this.reports.update((list) =>
      list.map((r) => (visibleIds.has(r.id) ? { ...r, selected: target } : r))
    );
  }

  deleteReport(id: string): void {
    this.reports.update((list) => list.filter((r) => r.id !== id));
    this.deletingReport.set(null);
  }

  exportCsv(): void {
    const rows = this.filteredReports();
    const headers = ['Report ID', 'Title', 'Status', 'Scope', 'Period', 'Total Sales', 'Generated Date'];
    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${r.reportCode}"`,
          `"${r.reportTitle}"`,
          `"${r.status}"`,
          `"${r.accountScope}"`,
          `"${r.periodCovered}"`,
          `"${r.totalSalesDisplay}"`,
          `"${r.generatedDate}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-reports.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  printView(): void {
    window.print();
  }
}