import { Component } from '@angular/core';
import { SalesAndOrdersSnapshot as SalesAndOrdersSnapshotLayout } from '../../../layout/overview-and-analytics-module/sales-and-orders-snapshot/sales-and-orders-snapshot';

@Component({
  selector: 'app-sales-and-orders-snapshot',
  imports: [SalesAndOrdersSnapshotLayout],
  templateUrl: './sales-and-orders-snapshot.html',
  styleUrl: './sales-and-orders-snapshot.css',
})
export class SalesAndOrdersSnapshot {}