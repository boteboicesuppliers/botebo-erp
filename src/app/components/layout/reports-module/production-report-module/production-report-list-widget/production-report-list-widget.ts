import { Component, computed, signal } from '@angular/core';
import { DeleteProductionReportForm } from '../delete-production-report-form/delete-production-report-form';

export interface ProductionReportRecord {
  id: string;
  reportCode: string;
  reportTitle: string;
  status: 'Ready' | 'Archived' | 'Pending Sync';
  lineOrScope: string;
  periodCovered: string;
  totalOutputDisplay: string;
  generatedDate: string;
  generatedBy: string;
  selected: boolean;
}

@Component({
  selector: 'app-production-report-list-widget',
  imports: [DeleteProductionReportForm],
  templateUrl: './production-report-list-widget.html',
  styleUrl: './production-report-list-widget.css',
})
export class ProductionReportListWidget {
  searchQuery = signal('');
  deletingReport = signal<ProductionReportRecord | null>(null);
  pageSize = signal(8);
  currentPage = signal(1);

  reports = signal<ProductionReportRecord[]>([
    {
      id: 'PR-1',
      reportCode: 'RPT-PRD-2026-1122',
      reportTitle: 'Daily Ice Batch & Machine Output Summary',
      status: 'Ready',
      lineOrScope: 'Lines 01–03 (Cube & Block)',
      periodCovered: '2026-11-22',
      totalOutputDisplay: '1,660 Units',
      generatedDate: '2026-11-22',
      generatedBy: 'System (Batch Data)',
      selected: false,
    },
    {
      id: 'PR-2',
      reportCode: 'RPT-PRD-2026-W47',
      reportTitle: 'Weekly Production Schedule vs. Actual Output',
      status: 'Ready',
      lineOrScope: 'All Production Lines',
      periodCovered: '2026-11-16 to 2026-11-22',
      totalOutputDisplay: '8,950 Units',
      generatedDate: '2026-11-22',
      generatedBy: 'System (Batch Data)',
      selected: false,
    },
    {
      id: 'PR-3',
      reportCode: 'RPT-PRD-2026-10',
      reportTitle: 'Monthly Cold-Room & Freezer Batch Ledger',
      status: 'Archived',
      lineOrScope: 'Main Freezer & Cold Store',
      periodCovered: 'October 2026',
      totalOutputDisplay: '34,200 Units',
      generatedDate: '2026-11-01',
      generatedBy: 'System (Batch Data)',
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
        r.lineOrScope.toLowerCase().includes(q) ||
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
    const headers = ['Report ID', 'Title', 'Status', 'Scope', 'Period', 'Output', 'Generated Date'];
    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${r.reportCode}"`,
          `"${r.reportTitle}"`,
          `"${r.status}"`,
          `"${r.lineOrScope}"`,
          `"${r.periodCovered}"`,
          `"${r.totalOutputDisplay}"`,
          `"${r.generatedDate}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'production-reports.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  printView(): void {
    window.print();
  }
}