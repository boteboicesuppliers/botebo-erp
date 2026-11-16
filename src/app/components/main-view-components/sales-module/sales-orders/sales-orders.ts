import { Component } from '@angular/core';
import { SalesOrderKpiOverview } from '../../../layout/sales-module/sales-orders/sales-order-kpi-overview/sales-order-kpi-overview';
import { UrgentOrdersWidget } from '../../../layout/sales-module/sales-orders/urgent-orders-widget/urgent-orders-widget';
import { SalesOrderListWidget } from '../../../layout/sales-module/sales-orders/sales-order-list-widget/sales-order-list-widget';

@Component({
  selector: 'app-sales-orders',
  imports: [
    SalesOrderKpiOverview,
    UrgentOrdersWidget,
    SalesOrderListWidget,
  ],
  templateUrl: './sales-orders.html',
  styleUrl: './sales-orders.css',
})
export class SalesOrders {
  // Main container logic for the Sales Orders module
}