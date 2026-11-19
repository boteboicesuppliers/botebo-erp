import { Routes } from '@angular/router';
import { LoginForm } from './components/auth/login-form/login-form';
import { Dashboard } from './components/main-view-components/dashboard/dashboard';
import { Contracts } from './components/main-view-components/contracts/contracts';
import { Suppliers } from './components/main-view-components/suppliers/suppliers';
import { SalesPrimary } from './components/main-view-components/sales-module/sales-primary/sales-primary';
import { Quotations } from './components/main-view-components/sales-module/quotations/quotations';
import { SalesPipeline } from './components/main-view-components/sales-module/sales-pipeline/sales-pipeline';
import { SalesOrders } from './components/main-view-components/sales-module/sales-orders/sales-orders';
import { Invoices } from './components/main-view-components/sales-module/invoices/invoices';
import { ProductionModule } from './components/main-view-components/production-module/production-module';
import { ProductionSchedule } from './components/layout/production-module/production-schedule/production-schedule';
import { ProductionOrdersAndBatches } from './components/layout/production-module/production-orders-and-batches/production-orders-and-batches';
import { MachineAndLineStatus } from './components/layout/production-module/machine-and-line-status/machine-and-line-status';

// Purchases Module
import { PurchaseRequests } from './components/main-view-components/purchases-module/purchase-requests/purchase-requests';
import { PurchasesPrimary } from './components/main-view-components/purchases-module/purchases-primary/purchases-primary';
import { RecievedStockGrn } from './components/main-view-components/purchases-module/recieved-stock-grn/recieved-stock-grn';
import { RequestForQuoteRfq } from './components/main-view-components/purchases-module/request-for-quote-rfq/request-for-quote-rfq';
import { QuoteRequestListWidget } from './components/layout/purchases-module/requests-for-quote-module/quote-request-list-widget/quote-request-list-widget';
import { SupplierPriceLists } from './components/main-view-components/purchases-module/supplier-price-lists/supplier-price-lists';

// Staff Module
import { StaffPrimary } from './components/main-view-components/staff-module/staff-primary/staff-primary';
import { ShiftSchedule } from './components/main-view-components/staff-module/shift-schedule/shift-schedule';

import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  // Public: login page (signed-in users get sent into the app instead)
  { path: 'login', component: LoginForm, canActivate: [guestGuard] },

  // Protected: everything below requires a signed-in user
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'contracts', component: Contracts },
      { path: 'suppliers', component: Suppliers },

      // Sales Module Routes
      { path: 'sales', component: SalesPrimary },
      { path: 'sales/sales-pipeline', component: SalesPipeline },
      { path: 'sales/quotations', component: Quotations },
      { path: 'sales/sales-orders', component: SalesOrders },
      { path: 'sales/invoices', component: Invoices },

      // Production Module Routes
      { path: 'production', component: ProductionModule },
      { path: 'production/schedule', component: ProductionSchedule },
      { path: 'production/orders', component: ProductionOrdersAndBatches },
      { path: 'production/machines', component: MachineAndLineStatus },

      // Purchases Module Routes
      { path: 'purchases', component: PurchasesPrimary },
      { path: 'purchases/requests', component: PurchaseRequests },
      { path: 'purchases/rfq', component: QuoteRequestListWidget },
      { path: 'purchases/rfq-overview', component: RequestForQuoteRfq },
      { path: 'purchases/grn', component: RecievedStockGrn },
      { path: 'suppliers/price-lists', component: SupplierPriceLists },

      // Staff Module Routes
      { path: 'staff', component: StaffPrimary },
      { path: 'staff/shift-schedule', component: ShiftSchedule },
    ],
  },

  // Anything unknown goes back through the guard
  { path: '**', redirectTo: '' },
];