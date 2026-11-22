import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ReportTimeframe = 'All' | 'Today' | 'This Week' | 'This Month';

interface SeriesPoint {
  label: string;
  productionUnits: number;
  purchasingSpend: number;
  salesRevenue: number;
}

interface BarDatum {
  label: string;
  value: number;
  display: string;
}

@Component({
  selector: 'app-reports-primary-view',
  imports: [RouterLink],
  templateUrl: './reports-primary.html',
  styleUrl: './reports-primary.css',
})
export class ReportsPrimary {
  readonly Math = Math;
  timeframe = signal<ReportTimeframe>('This Week');

  private allSeries = signal<SeriesPoint[]>([
    { label: 'Mon', productionUnits: 1420, purchasingSpend: 12400, salesRevenue: 8200 },
    { label: 'Tue', productionUnits: 1680, purchasingSpend: 9800, salesRevenue: 9450 },
    { label: 'Wed', productionUnits: 1510, purchasingSpend: 22100, salesRevenue: 11200 },
    { label: 'Thu', productionUnits: 1890, purchasingSpend: 6400, salesRevenue: 10800 },
    { label: 'Fri', productionUnits: 2150, purchasingSpend: 18500, salesRevenue: 14600 },
    { label: 'Sat', productionUnits: 2480, purchasingSpend: 11200, salesRevenue: 17900 },
    { label: 'Sun', productionUnits: 1660, purchasingSpend: 24800, salesRevenue: 6480 },
  ]);

  visibleSeries = computed<SeriesPoint[]>(() => {
    const tf = this.timeframe();
    const list = this.allSeries();
    if (tf === 'Today') return list.slice(-1);
    if (tf === 'This Week') return list;
    return list;
  });

  totals = computed(() => {
    const rows = this.visibleSeries();
    const outputUnits = rows.reduce((sum, r) => sum + r.productionUnits, 0);
    const stockSpend = rows.reduce((sum, r) => sum + r.purchasingSpend, 0);
    const salesTotal = rows.reduce((sum, r) => sum + r.salesRevenue, 0);
    const grossSpread = salesTotal - stockSpend;
    return { outputUnits, stockSpend, salesTotal, grossSpread };
  });

  // SVG dimensions for the multi-series trend chart
  readonly chartWidth = 640;
  readonly chartHeight = 210;
  readonly padLeft = 48;
  readonly padRight = 18;
  readonly padTop = 18;
  readonly padBottom = 30;

  maxTrendValue = computed(() => {
    const rows = this.visibleSeries();
    const peak = Math.max(
      ...rows.map((r) => Math.max(r.salesRevenue, r.purchasingSpend, r.productionUnits)),
      1000
    );
    return Math.ceil(peak / 5000) * 5000;
  });

  yTicks = computed(() => {
    const max = this.maxTrendValue();
    return [max, Math.round(max * 0.66), Math.round(max * 0.33), 0];
  });

  private toCoords(selector: (p: SeriesPoint) => number): { x: number; y: number; label: string; raw: number }[] {
    const rows = this.visibleSeries();
    const plotW = this.chartWidth - this.padLeft - this.padRight;
    const plotH = this.chartHeight - this.padTop - this.padBottom;
    const maxVal = this.maxTrendValue() || 1;
    const stepX = rows.length > 1 ? plotW / (rows.length - 1) : plotW / 2;

    return rows.map((row, idx) => {
      const raw = selector(row);
      const x = rows.length > 1 ? this.padLeft + idx * stepX : this.padLeft + plotW / 2;
      const ratio = Math.min(1, Math.max(0, raw / maxVal));
      const y = this.padTop + plotH - ratio * plotH;
      return { x, y, label: row.label, raw };
    });
  }

  salesPoints = computed(() => this.toCoords((r) => r.salesRevenue));
  purchasingPoints = computed(() => this.toCoords((r) => r.purchasingSpend));
  productionPoints = computed(() => this.toCoords((r) => r.productionUnits));

  salesPolyline = computed(() =>
    this.salesPoints().map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  );

  purchasingPolyline = computed(() =>
    this.purchasingPoints().map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  );

  productionPolyline = computed(() =>
    this.productionPoints().map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  );

  // Horizontal bar breakdown by report stream
  streamBars = computed<BarDatum[]>(() => {
    const t = this.totals();
    return [
      {
        label: 'Sales Revenue',
        value: t.salesTotal,
        display: `R ${t.salesTotal.toLocaleString()}`,
      },
      {
        label: 'Purchasing & Stock',
        value: t.stockSpend,
        display: `R ${t.stockSpend.toLocaleString()}`,
      },
      {
        label: 'Production Output',
        value: t.outputUnits,
        display: `${t.outputUnits.toLocaleString()} Units`,
      },
    ];
  });

  maxStreamBarValue = computed(() =>
    Math.max(...this.streamBars().map((b) => b.value), 1)
  );

  barWidthPercent(val: number): number {
    return Math.round((val / this.maxStreamBarValue()) * 100);
  }

  // Donut ring segments for report mix share
  readonly donutRadius = 42;
  readonly donutCircumference = 2 * Math.PI * 42;

  donutSegments = computed(() => {
    const bars = this.streamBars();
    const total = Math.max(
      bars.reduce((s, b) => s + b.value, 0),
      1
    );
    const colors = ['#1b5a9a', '#0f766e', '#475569'];
    let accumulated = 0;

    return bars.map((b, i) => {
      const fraction = b.value / total;
      const length = fraction * this.donutCircumference;
      const dashArray = `${length.toFixed(2)} ${this.donutCircumference.toFixed(2)}`;
      const dashOffset = (-accumulated).toFixed(2);
      accumulated += length;
      return {
        label: b.label,
        display: b.display,
        percent: Math.round(fraction * 100),
        color: colors[i],
        dashArray,
        dashOffset,
      };
    });
  });

  yPosForTick(tick: number): number {
    const plotH = this.chartHeight - this.padTop - this.padBottom;
    const maxVal = this.maxTrendValue() || 1;
    return this.padTop + plotH - (tick / maxVal) * plotH;
  }
}