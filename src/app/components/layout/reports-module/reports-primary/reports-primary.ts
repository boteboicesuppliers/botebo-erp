import { Component, computed, signal, WritableSignal } from '@angular/core';

export type ReportCategory = 'Production' | 'Purchasing & Stock' | 'Sales';
export type ReportStatusTone = 'active' | 'pending' | 'alert' | 'neutral';

export interface ReportTableRow {
  id: string;
  reference: string;
  name: string;
  status: string;
  statusTone: ReportStatusTone;
  detail: string;
  periodOrOwner: string;
  metricDisplay: string;
  numericValue: number;
  extraNotes: string;
  selected: boolean;
}

@Component({
  selector: 'app-reports-primary-view',
  imports: [],
  templateUrl: './reports-primary.html',
  styleUrl: './reports-primary.css',
})
export class ReportsPrimary {
  activeReport = signal<ReportCategory>('Production');
  searchQuery = signal('');
  selectMode = signal(false);
  showMoreMenu = signal(false);
  showColumnsMenu = signal(false);
  showExtraColumns = signal(false);

  pageSize = signal(8);
  currentPage = signal(1);

  private productionData = signal<ReportTableRow[]>([
    {
      id: 'P-1',
      reference: 'BCH-ICE-1120A',
      name: '2kg Party Cube Ice Bag',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 01 - Cube Machine A',
      periodOrOwner: '2026-11-22 (Today)',
      metricDisplay: '1,450 Bags',
      numericValue: 1450,
      extraNotes: 'Core temp -6.5°C',
      selected: false,
    },
    {
      id: 'P-2',
      reference: 'BCH-BLK-1120B',
      name: '10kg Block Ice',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 02 - Block Tank 1',
      periodOrOwner: '2026-11-22 (Today)',
      metricDisplay: '210 Blocks',
      numericValue: 210,
      extraNotes: 'Blast freezer batch',
      selected: false,
    },
    {
      id: 'P-3',
      reference: 'BCH-ICE-1119C',
      name: '5kg Commercial Cube Ice Bag',
      status: 'Pending',
      statusTone: 'pending',
      detail: 'Line 01 - Cube Machine A',
      periodOrOwner: '2026-11-19 (This Week)',
      metricDisplay: '980 Bags',
      numericValue: 980,
      extraNotes: 'Awaiting cold-room sign-off',
      selected: false,
    },
    {
      id: 'P-4',
      reference: 'BCH-ICE-1118A',
      name: '2kg Party Cube Ice Bag',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 03 - Packing Unit',
      periodOrOwner: '2026-11-18 (This Week)',
      metricDisplay: '1,820 Bags',
      numericValue: 1820,
      extraNotes: 'Passed QC check',
      selected: false,
    },
    {
      id: 'P-5',
      reference: 'BCH-BLK-1116A',
      name: '10kg Block Ice',
      status: 'On Hold',
      statusTone: 'alert',
      detail: 'Line 02 - Block Tank 2',
      periodOrOwner: '2026-11-16 (This Week)',
      metricDisplay: '140 Blocks',
      numericValue: 140,
      extraNotes: 'Quarantine check logged',
      selected: false,
    },
    {
      id: 'P-6',
      reference: 'BCH-ICE-1114B',
      name: '5kg Commercial Cube Ice Bag',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 01 - Cube Machine B',
      periodOrOwner: '2026-11-14 (This Month)',
      metricDisplay: '2,340 Bags',
      numericValue: 2340,
      extraNotes: 'Full shift completed',
      selected: false,
    },
    {
      id: 'P-7',
      reference: 'BCH-ICE-1110A',
      name: '2kg Party Cube Ice Bag',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 03 - Packing Unit',
      periodOrOwner: '2026-11-10 (This Month)',
      metricDisplay: '3,100 Bags',
      numericValue: 3100,
      extraNotes: 'High-volume run',
      selected: false,
    },
    {
      id: 'P-8',
      reference: 'BCH-BLK-1105A',
      name: '10kg Block Ice',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 02 - Block Tank 1',
      periodOrOwner: '2026-11-05 (This Month)',
      metricDisplay: '420 Blocks',
      numericValue: 420,
      extraNotes: 'Standard batch',
      selected: false,
    },
    {
      id: 'P-9',
      reference: 'BCH-ICE-1102A',
      name: '2kg Party Cube Ice Bag',
      status: 'Active',
      statusTone: 'active',
      detail: 'Line 01 - Cube Machine A',
      periodOrOwner: '2026-11-02 (This Month)',
      metricDisplay: '1,690 Bags',
      numericValue: 1690,
      extraNotes: 'Month opening run',
      selected: false,
    },
  ]);

  private purchasingStockData = signal<ReportTableRow[]>([
    {
      id: 'S-1',
      reference: 'GRN-2026-104',
      name: 'RO Filtration & Purification Cartridges',
      status: 'Active',
      statusTone: 'active',
      detail: 'PureFlow Water Systems',
      periodOrOwner: '2026-11-22 (Today)',
      metricDisplay: 'R 18,400',
      numericValue: 18400,
      extraNotes: '12 units received',
      selected: false,
    },
    {
      id: 'S-2',
      reference: 'GRN-2026-106',
      name: 'Food-Grade 2kg Ice Poly Bag Roll',
      status: 'Pending',
      statusTone: 'pending',
      detail: 'Apex FlexiPack - Cold Store A',
      periodOrOwner: '2026-11-19 (This Week)',
      metricDisplay: 'R 33,750',
      numericValue: 33750,
      extraNotes: '45 rolls; COA pending',
      selected: false,
    },
    {
      id: 'S-3',
      reference: 'STK-2026-019',
      name: '5kg Commercial Ice Bags (Stock Count)',
      status: 'Active',
      statusTone: 'active',
      detail: 'Main Freezer Room',
      periodOrOwner: '2026-11-12 (This Month)',
      metricDisplay: 'R 46,800',
      numericValue: 46800,
      extraNotes: '3,120 bags counted',
      selected: false,
    },
    {
      id: 'S-4',
      reference: 'GRN-2026-108',
      name: 'Sanitizer & Descaling Concentrate',
      status: 'On Hold',
      statusTone: 'alert',
      detail: 'HydroChem Industrial',
      periodOrOwner: '2026-11-10 (This Month)',
      metricDisplay: 'R 6,250',
      numericValue: 6250,
      extraNotes: 'Label check hold',
      selected: false,
    },
  ]);

  private salesData = signal<ReportTableRow[]>([
    {
      id: 'L-1',
      reference: 'INV-2026-308',
      name: 'Suncrest Hospitality Group',
      status: 'Active',
      statusTone: 'active',
      detail: 'SO-1088 - 240 x 2kg Party Cube Ice',
      periodOrOwner: '2026-11-22 (Today)',
      metricDisplay: 'R 6,480',
      numericValue: 6480,
      extraNotes: '30-day account',
      selected: false,
    },
    {
      id: 'L-2',
      reference: 'INV-2026-309',
      name: 'Highveld Liquor & Mart',
      status: 'Active',
      statusTone: 'active',
      detail: 'SO-1091 - 350 x 5kg Commercial Ice',
      periodOrOwner: '2026-11-20 (This Week)',
      metricDisplay: 'R 12,950',
      numericValue: 12950,
      extraNotes: 'Paid via EFT',
      selected: false,
    },
    {
      id: 'L-3',
      reference: 'INV-2026-295',
      name: 'AquaCold Events & Catering',
      status: 'Pending',
      statusTone: 'pending',
      detail: 'SO-1075 - 160 x 10kg Block Ice',
      periodOrOwner: '2026-11-08 (This Month)',
      metricDisplay: 'R 9,600',
      numericValue: 9600,
      extraNotes: 'Due in 7 days',
      selected: false,
    },
    {
      id: 'L-4',
      reference: 'INV-2026-288',
      name: 'Metro Forecourt & Convenience',
      status: 'Active',
      statusTone: 'active',
      detail: 'SO-1069 - 500 x 2kg Party Cube Ice',
      periodOrOwner: '2026-11-04 (This Month)',
      metricDisplay: 'R 13,500',
      numericValue: 13500,
      extraNotes: 'Contract account',
      selected: false,
    },
  ]);

  private getActiveSignal(): WritableSignal<ReportTableRow[]> {
    switch (this.activeReport()) {
      case 'Production':
        return this.productionData;
      case 'Purchasing & Stock':
        return this.purchasingStockData;
      case 'Sales':
        return this.salesData;
    }
  }

  activeRows = computed<ReportTableRow[]>(() => this.getActiveSignal()());

  filteredRows = computed<ReportTableRow[]>(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.activeRows();
    if (!q) return list;
    return list.filter(
      (r) =>
        r.reference.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        r.detail.toLowerCase().includes(q) ||
        r.periodOrOwner.toLowerCase().includes(q)
    );
  });

  totalFilteredCount = computed(() => this.filteredRows().length);

  totalPages = computed(() => {
    const size = Math.max(1, Number(this.pageSize()) || 8);
    return Math.max(1, Math.ceil(this.totalFilteredCount() / size));
  });

  pageNumbers = computed(() => {
    const count = this.totalPages();
    return Array.from({ length: count }, (_, idx) => idx + 1);
  });

  pagedRows = computed(() => {
    const size = Math.max(1, Number(this.pageSize()) || 8);
    const page = Math.min(Math.max(1, this.currentPage()), this.totalPages());
    const start = (page - 1) * size;
    return this.filteredRows().slice(start, start + size);
  });

  rangeStart = computed(() => {
    if (this.totalFilteredCount() === 0) return 0;
    const size = Math.max(1, Number(this.pageSize()) || 8);
    const page = Math.min(Math.max(1, this.currentPage()), this.totalPages());
    return (page - 1) * size + 1;
  });

  rangeEnd = computed(() => {
    if (this.totalFilteredCount() === 0) return 0;
    const size = Math.max(1, Number(this.pageSize()) || 8);
    const page = Math.min(Math.max(1, this.currentPage()), this.totalPages());
    return Math.min(this.totalFilteredCount(), page * size);
  });

  selectedCount = computed(() =>
    this.activeRows().filter((r) => r.selected).length
  );

  allVisibleSelected = computed(() => {
    const rows = this.pagedRows();
    return rows.length > 0 && rows.every((r) => r.selected);
  });

  switchReport(report: ReportCategory): void {
    this.activeReport.set(report);
    this.currentPage.set(1);
    this.showMoreMenu.set(false);
    this.showColumnsMenu.set(false);
  }

  toggleSelectMode(): void {
    this.selectMode.update((v) => !v);
  }

  toggleRowSelection(id: string): void {
    const targetSignal = this.getActiveSignal();
    targetSignal.update((list) =>
      list.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  }

  toggleSelectAllVisible(): void {
    const targetState = !this.allVisibleSelected();
    const visibleIds = new Set(this.pagedRows().map((r) => r.id));
    const targetSignal = this.getActiveSignal();
    targetSignal.update((list) =>
      list.map((r) => (visibleIds.has(r.id) ? { ...r, selected: targetState } : r))
    );
  }

  setPageSize(size: number): void {
    this.pageSize.set(Number(size) || 8);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    const clamped = Math.min(Math.max(1, page), this.totalPages());
    this.currentPage.set(clamped);
  }

  exportCsv(): void {
    const rows = this.filteredRows();
    const headers = ['Reference', 'Name', 'Status', 'Detail', 'Date / Period', 'Volume / Value', 'Notes'];
    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${r.reference}"`,
          `"${r.name}"`,
          `"${r.status}"`,
          `"${r.detail}"`,
          `"${r.periodOrOwner}"`,
          `"${r.metricDisplay}"`,
          `"${r.extraNotes}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.activeReport().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showMoreMenu.set(false);
  }

  printReport(): void {
    window.print();
  }

  statusBadgeClasses(tone: ReportStatusTone): string {
    switch (tone) {
      case 'active':
        return 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]';
      case 'pending':
        return 'bg-[#fef3c7] text-[#b45309] border border-[#fde68a]';
      case 'alert':
        return 'bg-[#f3e8ff] text-[#7e22ce] border border-[#e9d5ff]';
      default:
        return 'bg-[#e2e8f0] text-[#334155] border border-[#cbd5e1]';
    }
  }
}