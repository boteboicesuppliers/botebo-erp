import { Routes } from '@angular/router';
import { LoginForm } from './components/auth/login-form/login-form';
import { Dashboard } from './components/main-view-components/dashboard/dashboard';
import { Contracts } from './components/main-view-components/contracts/contracts';
import { Suppliers } from './components/main-view-components/suppliers/suppliers';
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
    ],
  },

  // Anything unknown goes back through the guard
  { path: '**', redirectTo: '' },
];