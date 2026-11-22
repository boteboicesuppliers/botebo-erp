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
import { StockCount } from './components/main-view-components/production-module/stock-count/stock-count';
import { Locations } from './components/main-view-components/production-module/locations/locations';

// Products & Materials Module
import { ProductsAndMaterialsPrimary } from './components/main-view-components/products-and-materials-module/products-and-materials-primary/products-and-materials-primary';
import { FinishedGoods } from './components/main-view-components/products-and-materials-module/finished-goods/finished-goods';
import { RawMaterialsAndPackaging } from './components/main-view-components/products-and-materials-module/raw-materials-and-packaging/raw-materials-and-packaging';
import { Recipe } from './components/main-view-components/products-and-materials-module/recipe/recipe';

// Quality Management Module
import { QualityManagementPrimary } from './components/main-view-components/quality-management-module/quality-management-primary/quality-management-primary';
import { RawMaterialsChecks } from './components/main-view-components/quality-management-module/raw-materials-checks/raw-materials-checks';
import { FinishedProductChecks } from './components/main-view-components/quality-management-module/finished-product-checks/finished-product-checks';
import { DamagedAndRejectedStock } from './components/main-view-components/quality-management-module/damaged-and-rejected-stock/damaged-and-rejected-stock';

// Logistics Module
import { LogisticsPrimary } from './components/main-view-components/logistics-module/logistics-primary/logistics-primary';
import { DeliverySchedulesListWidget } from './components/layout/logistics-module/delivery-schedules-module/delivery-schedules-list-widget/delivery-schedules-list-widget';

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
import { AttendanceAndHours } from './components/main-view-components/staff-module/attendance-and-hours/attendance-and-hours';

// Accounting Module
import { AccountingPrimary } from './components/main-view-components/accounting-module/accounting-primary/accounting-primary';
import { Bookkeeping } from './components/main-view-components/accounting-module/bookkeeping/bookkeeping';
import { FinancialStatements } from './components/main-view-components/accounting-module/financial-statements/financial-statements';
import { FinancialProjections } from './components/main-view-components/accounting-module/financial-projections/financial-projections';

// Configurations Module
import { ProductAgnostics } from './components/main-view-components/configurations-module/product-agnostics/product-agnostics';
import { CategoriesAndClassifications } from './components/main-view-components/configurations-module/categories-and-classifications/categories-and-classifications';
import { WorkflowsListWidget } from './components/layout/configurations-module/workflows-module/workflows-list-widget/workflows-list-widget';

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
      { path: 'production/locations', component: Locations },
      { path: 'production/stock-counts', component: StockCount },
      { path: 'production/machines', component: MachineAndLineStatus },

      // Products & Materials Module Routes
      { path: 'products', component: ProductsAndMaterialsPrimary },
      { path: 'products/finished-goods', component: FinishedGoods },
      { path: 'products/raw-materials', component: RawMaterialsAndPackaging },
      { path: 'products/bom', component: Recipe },

      // Quality Management Module Routes
      { path: 'quality', component: QualityManagementPrimary },
      { path: 'quality/raw-materials', component: RawMaterialsChecks },
      { path: 'quality/finished-goods', component: FinishedProductChecks },
      { path: 'quality/rejected', component: DamagedAndRejectedStock },

      // Logistics Module Routes
      { path: 'logistics', component: LogisticsPrimary },
      { path: 'logistics/schedule', component: DeliverySchedulesListWidget },

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
      { path: 'staff/attendance', component: AttendanceAndHours },

      // Accounting Module Routes
      { path: 'accounting', component: AccountingPrimary },
      { path: 'accounting/bookkeeping', component: Bookkeeping },
      { path: 'accounting/financial-statements', component: FinancialStatements },
      { path: 'accounting/financial-projections', component: FinancialProjections },

      // Configurations Module Routes
      { path: 'configurations/product-agnostics', component: ProductAgnostics },
      { path: 'configurations/categories-and-classifications', component: CategoriesAndClassifications },
      { path: 'configurations/workflows', component: WorkflowsListWidget },
    ],
  },

  // Anything unknown goes back through the guard
  { path: '**', redirectTo: '' },
];