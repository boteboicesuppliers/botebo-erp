import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private auth = inject(AuthService);
  private router = inject(Router);

  navigation = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Inventory', route: '/inventory' },
    { name: 'Sales Orders', route: '/sales-orders' },
    { name: 'Purchases', route: '/purchases' },
    { name: 'Invoices', route: '/invoices' },
    { name: 'Quotations', route: '/quotations' },
    { name: 'Contracts', route: '/contracts' },
    { name: 'Suppliers', route: '/suppliers' },
    { name: 'Logistics', route: '/logistics' },
    { name: 'Financials', route: '/financials' },
    { name: 'Analytics', route: '/analytics' },
  ];

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}