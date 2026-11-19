import { Component, computed, signal } from '@angular/core';

export type PeriodKind = 'Historical' | 'Projected';
export type PeriodFilter = 'All' | 'Historical' | 'Projected';
export type SortField = 'id' | 'period' | 'revenue' | 'grossProfit' | 'netProfit' | 'marginPercent';
export type SortDirection = 'asc' | 'desc';
export type ChartMetricFocus = 'All' | 'Revenue' | 'GrossProfit' | 'NetProfit';

export interface BaseFinancialPeriod {
  id: number;
  period: string;
  kind: PeriodKind;
  revenue: number;
  cogs: number;
  grossProfit: number;
  opex: number;
  netProfit: number;
  marginPercent: number;
}

export interface ComputedFinancialRow extends BaseFinancialPeriod {}

export interface TrendPoint {
  label: string;
  kind: PeriodKind;
  x: number;
  revenueY: number;
  grossProfitY: number;
  netProfitY: number;
  marginY: number;
  revenue: number;
  grossProfit: number;
  netProfit: number;
  marginPercent: number;
}

export interface BarColumn {
  label: string;
  kind: PeriodKind;
  x: number;
  width: number;
  y: number;
  height: number;
  labelY: number;
  netProfit: number;
  marginPercent: number;
}

@Component({
  selector: 'app-financial-analysis-overview',
  imports: [],
  templateUrl: './financial-analysis-overview.html',
  styleUrl: './financial-analysis-overview.css',
})
export class FinancialAnalysisOverview {
  growthRatePercent = signal<number>(0);
  costInflationPercent = signal<number>(0);
  periodFilter = signal<PeriodFilter>('All');
  metricFocus = signal<ChartMetricFocus>('All');
  sortField = signal<SortField>('id');
  sortDirection = signal<SortDirection>('asc');
  searchQuery = signal<string>('');
  showBreakdownTable = signal<boolean>(false);

  private readonly rawPeriods = signal<BaseFinancialPeriod[]>([
    { id: 1, period: 'Jun 2026', kind: 'Historical', revenue: 192000, cogs: 96000, grossProfit: 96000, opex: 46500, netProfit: 49500, marginPercent: 25.8 },
    { id: 2, period: 'Jul 2026', kind: 'Historical', revenue: 204000, cogs: 101500, grossProfit: 102500, opex: 47200, netProfit: 55300, marginPercent: 27.1 },
    { id: 3, period: 'Aug 2026', kind: 'Historical', revenue: 215000, cogs: 106800, grossProfit: 108200, opex: 48000, netProfit: 60200, marginPercent: 28.0 },
    { id: 4, period: 'Sep 2026', kind: 'Historical', revenue: 229000, cogs: 113200, grossProfit: 115800, opex: 49100, netProfit: 66700, marginPercent: 29.1 },
    { id: 5, period: 'Oct 2026', kind: 'Historical', revenue: 241000, cogs: 118900, grossProfit: 122100, opex: 50400, netProfit: 71700, marginPercent: 29.8 },
    { id: 6, period: 'Nov 2026', kind: 'Historical', revenue: 252700, cogs: 127900, grossProfit: 124800, opex: 52200, netProfit: 72600, marginPercent: 28.7 },
    { id: 7, period: 'Dec 2026', kind: 'Projected', revenue: 300160, cogs: 139360, grossProfit: 160800, opex: 56160, netProfit: 104640, marginPercent: 34.9 },
    { id: 8, period: 'Jan 2027', kind: 'Projected', revenue: 282240, cogs: 131040, grossProfit: 151200, opex: 54600, netProfit: 96600, marginPercent: 34.2 },
    { id: 9, period: 'Feb 2027', kind: 'Projected', revenue: 292320, cogs: 135720, grossProfit: 156600, opex: 55120, netProfit: 101480, marginPercent: 34.7 },
    { id: 10, period: 'Mar 2027', kind: 'Projected', revenue: 274400, cogs: 127400, grossProfit: 147000, opex: 54080, netProfit: 92920, marginPercent: 33.9 },
    { id: 11, period: 'Apr 2027', kind: 'Projected', revenue: 244160, cogs: 113360, grossProfit: 130800, opex: 52520, netProfit: 78280, marginPercent: 32.1 },
    { id: 12, period: 'May 2027', kind: 'Projected', revenue: 228480, cogs: 106080, grossProfit: 122400, opex: 51792, netProfit: 70608, marginPercent: 30.9 },
  ]);

  computedAllRows = computed<ComputedFinancialRow[]>(() => {
    const growthFactor = 1 + (Number(this.growthRatePercent()) || 0) / 100;
    const inflationFactor = 1 + (Number(this.costInflationPercent()) || 0) / 100;

    return this.rawPeriods().map((item) => {
      if (item.kind === 'Historical' || (growthFactor === 1 && inflationFactor === 1)) {
        return { ...item };
      }

      const revenue = Math.round(item.revenue * growthFactor);
      const cogs = Math.round(item.cogs * inflationFactor);
      const grossProfit = revenue - cogs;
      const opex = Math.round(item.opex * inflationFactor);
      const netProfit = grossProfit - opex;
      const marginPercent = revenue > 0 ? Number(((netProfit / revenue) * 100).toFixed(1)) : 0;

      return {
        ...item,
        revenue,
        cogs,
        grossProfit,
        opex,
        netProfit,
        marginPercent,
      };
    });
  });

  visibleRows = computed<ComputedFinancialRow[]>(() => {
    const filter = this.periodFilter();
    const q = this.searchQuery().toLowerCase().trim();
    const field = this.sortField();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    const filtered = this.computedAllRows().filter((r) => {
      const matchesKind = filter === 'All' || r.kind === filter;
      const matchesSearch = !q || r.period.toLowerCase().includes(q) || r.kind.toLowerCase().includes(q);
      return matchesKind && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (field === 'period') {
        return a.period.localeCompare(b.period) * dir;
      }
      return (a[field] - b[field]) * dir;
    });
  });

  summaryMetrics = computed(() => {
    const rows = this.visibleRows();
    const totalRevenue = rows.reduce((s, r) => s + r.revenue, 0);
    const totalGrossProfit = rows.reduce((s, r) => s + r.grossProfit, 0);
    const totalNetProfit = rows.reduce((s, r) => s + r.netProfit, 0);
    const avgMargin =
      rows.length > 0
        ? Number((rows.reduce((s, r) => s + r.marginPercent, 0) / rows.length).toFixed(1))
        : 0;

    return {
      totalRevenue,
      totalGrossProfit,
      totalNetProfit,
      avgMargin,
    };
  });

  lineChartData = computed(() => {
    const rows = this.visibleRows();
    const width = 620;
    const height = 240;
    const padLeft = 52;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 32;
    const plotW = Math.max(1, width - padLeft - padRight);
    const plotH = Math.max(1, height - padTop - padBottom);

    const maxVal = Math.max(
      10000,
      ...rows.map((r) => Math.max(r.revenue, r.grossProfit, r.netProfit))
    );
    const minVal = Math.min(0, ...rows.map((r) => r.netProfit));
    const span = Math.max(1, maxVal - minVal);

    const maxMargin = Math.max(40, ...rows.map((r) => r.marginPercent + 5));

    const points: TrendPoint[] = rows.map((r, idx) => {
      const x =
        rows.length === 1
          ? padLeft + plotW / 2
          : padLeft + (idx / (rows.length - 1)) * plotW;

      return {
        label: r.period.slice(0, 3),
        kind: r.kind,
        x,
        revenueY: padTop + plotH - ((r.revenue - minVal) / span) * plotH,
        grossProfitY: padTop + plotH - ((r.grossProfit - minVal) / span) * plotH,
        netProfitY: padTop + plotH - ((r.netProfit - minVal) / span) * plotH,
        marginY: padTop + plotH - (r.marginPercent / maxMargin) * plotH,
        revenue: r.revenue,
        grossProfit: r.grossProfit,
        netProfit: r.netProfit,
        marginPercent: r.marginPercent,
      };
    });

    const toPath = (pickY: (p: TrendPoint) => number) =>
      points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${pickY(p).toFixed(1)}`).join(' ');

    return {
      width,
      height,
      padLeft,
      padTop,
      plotH,
      maxVal,
      maxMargin,
      points,
      revenuePath: toPath((p) => p.revenueY),
      grossProfitPath: toPath((p) => p.grossProfitY),
      netProfitPath: toPath((p) => p.netProfitY),
      marginPath: toPath((p) => p.marginY),
    };
  });

  barChartData = computed(() => {
    const rows = this.visibleRows();
    const width = 560;
    const height = 220;
    const padLeft = 50;
    const padRight = 18;
    const padTop = 20;
    const padBottom = 32;
    const plotW = Math.max(1, width - padLeft - padRight);
    const plotH = Math.max(1, height - padTop - padBottom);

    const maxNet = Math.max(10000, ...rows.map((r) => Math.max(0, r.netProfit)));
    const slotW = plotW / Math.max(1, rows.length);
    const barW = Math.max(10, Math.min(30, slotW * 0.58));

    const bars: BarColumn[] = rows.map((r, idx) => {
      const clamped = Math.max(0, r.netProfit);
      const h = (clamped / maxNet) * plotH;
      const x = padLeft + idx * slotW + (slotW - barW) / 2;
      const y = padTop + plotH - h;
      const labelY = Math.max(12, y - 4);
      return {
        label: r.period.slice(0, 3),
        kind: r.kind,
        x,
        width: barW,
        y,
        height: h,
        labelY,
        netProfit: r.netProfit,
        marginPercent: r.marginPercent,
      };
    });

    return {
      width,
      height,
      padLeft,
      padTop,
      plotH,
      maxNet,
      bars,
    };
  });

  toggleSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set(field === 'period' ? 'asc' : 'desc');
    }
  }

  formatZar(amount: number): string {
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    return `${sign}R ${abs.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  formatCompactZar(amount: number): string {
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    if (abs >= 1000000) {
      return `${sign}R${(abs / 1000000).toFixed(1)}m`;
    }
    if (abs >= 1000) {
      return `${sign}R${Math.round(abs / 1000)}k`;
    }
    return `${sign}R${Math.round(abs)}`;
  }
}