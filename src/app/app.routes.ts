import { Routes } from '@angular/router';
import { LoginForm } from './components/auth/login-form/login-form';
import { Dashboard } from './components/main-view-components/dashboard/dashboard';
import { Contracts } from './components/main-view-components/contracts/contracts';
import { Suppliers } from './components/main-view-components/suppliers/suppliers';
import { SalesPrimary } from './components/main-view-components/sales-module/sales-primary/sales-primary';
import { SalesPipeline } from './components/layout/sales-module/sales-pipeline/sales-pipeline';
import { SalesOrders } from './components/layout/sales-module/sales-orders/sales-orders';
import { Invoices } from './components/layout/sales-module/invoices/invoices';
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
      { path: 'sales/sales-orders', component: SalesOrders },
      { path: 'sales/invoices', component: Invoices },
    ],
  },

  // Anything unknown goes back through the guard
  { path: '**', redirectTo: '' },
];