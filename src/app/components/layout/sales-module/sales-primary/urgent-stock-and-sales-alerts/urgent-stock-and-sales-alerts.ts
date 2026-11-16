import { Component } from '@angular/core';

const NOW = new Date('2026-11-16T08:00:00'); // sample-data "now"; replace with new Date() once wired to real data

@Component({
  selector: 'app-urgent-stock-and-sales-alerts',
  imports: [],
  templateUrl: './urgent-stock-and-sales-alerts.html',
  styleUrl: './urgent-stock-and-sales-alerts.css',
})
export class UrgentStockAndSalesAlerts {
  // CRITICAL STOCK / RAW MATERIAL WARNINGS
  stockAlerts = [
    { item: 'Copper rod 8mm', sku: 'CRD-0008', kind: 'Raw material', onHand: 120, safety: 400, orders: 'Needed for SO-2100' },
    { item: 'Zinc coating drum', sku: 'ZNC-0003', kind: 'Raw material', onHand: 40, safety: 100, orders: 'Needed for SO-2094' },
    { item: 'Hydraulic pump assembly', sku: 'HYD-0048', kind: 'Finished goods', onHand: 22, safety: 60, orders: 'Needed for SO-2101' },
    { item: 'Carton box 40L', sku: 'PKG-0040', kind: 'Packaging', onHand: 1050, safety: 1500, orders: '6 open orders' },
  ];

  // EXPIRING / STALLED QUOTATIONS
  quotes = [
    { ref: 'QT-3050', client: 'Karoo Mining Supplies', value: 312000, expiry: '2026-11-18T05:00', note: 'Sent 4 days ago, no reply' },
    { ref: 'QT-3051', client: 'Cape Engineering', value: 96200, expiry: '2026-11-17T12:00', note: 'Sent 3 days ago, no reply' },
    { ref: 'QT-3053', client: 'Pretoria Hardware', value: 148000, expiry: '2026-11-17T17:00', note: 'Sent 5 days ago, opened twice' },
  ].sort((a, b) => Date.parse(a.expiry) - Date.parse(b.expiry));

  // FULFILMENT BLOCKERS
  blockers = [
    { order: 'SO-2095', client: 'Free State Agri', reason: 'Production batch backlog', detail: 'Batch B-890 is queued behind 3 jobs', days: 5, value: 215000 },
    { order: 'SO-2099', client: 'Karoo Mining Supplies', reason: 'Production batch backlog', detail: 'Batch B-871 delayed to 18 Nov', days: 3, value: 72300 },
    { order: 'SO-2102', client: 'Mabena Industrial', reason: 'Credit limit approval', detail: 'Order exceeds credit limit by R 42,000', days: 2, value: 148500 },
    { order: 'SO-2103', client: 'Durban Supplies', reason: 'Credit limit approval', detail: 'Waiting for finance sign-off', days: 1, value: 61800 },
  ];

  stockPct = (s: { onHand: number; safety: number }) => Math.round((s.onHand / s.safety) * 100);
  hoursLeft = (q: { expiry: string }) => Math.max(0, Math.round((Date.parse(q.expiry) - NOW.getTime()) / 3.6e6));
  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}