import { Component } from '@angular/core';
import { CommercialFulfillmentKpiOverview } from '../../../layout/sales-module/sales-primary/commercial-fulfillment-kpi-overview/commercial-fulfillment-kpi-overview';
import { OrdersAndShippingOverview } from '../../../layout/sales-module/sales-primary/orders-and-shipping-overview/orders-and-shipping-overview';
import { UrgentStockAndSalesAlerts } from '../../../layout/sales-module/sales-primary/urgent-stock-and-sales-alerts/urgent-stock-and-sales-alerts';

@Component({
  selector: 'app-sales-primary',
  imports: [CommercialFulfillmentKpiOverview, OrdersAndShippingOverview, UrgentStockAndSalesAlerts],
  templateUrl: './sales-primary.html',
  styleUrl: './sales-primary.css',
})
export class SalesPrimary {}