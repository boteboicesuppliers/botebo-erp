import { Routes } from '@angular/router';
import { Dashboard } from './components/main-view-components/dashboard/dashboard';
import { Contracts } from './components/main-view-components/contracts/contracts';
import { Suppliers } from './components/main-view-components/suppliers/suppliers';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'contracts', component: Contracts },
  { path: 'suppliers', component: Suppliers}
];