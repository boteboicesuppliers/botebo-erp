import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';

export interface NavSubItem {
  name: string;
  route: string;
}

export interface NavItem {
  name: string;
  route: string;
  icon: string;
  children?: NavSubItem[];
}

export interface FavoriteItem {
  name: string;
  route: string;
  badge?: number | string;
}

export interface RecentItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private auth = inject(AuthService);
  private router = inject(Router);

  private readonly FAVORITES_STORAGE_KEY = 'botebo_erp_favorites';
  private readonly RECENT_STORAGE_KEY = 'botebo_erp_recent';

  expandedSections = signal<Record<string, boolean>>({
    'Overview & Analytics': true,
  });

  favorites = signal<FavoriteItem[]>(this.loadFavorites());
  recentlyUsed = signal<RecentItem[]>(this.loadRecent());

  navigation: NavItem[] = [
    {
      name: 'Overview & Analytics',
      route: '/overview',
      icon: 'overview',
      children: [
        { name: 'Daily Operations', route: '/overview/daily-operations' },
        { name: 'Stock & Warehouse Alerts', route: '/overview/stock-alerts' },
        { name: 'Sales & Orders Snapshot', route: '/overview/sales-snapshot' },
      ],
    },
    {
      name: 'Products & Materials',
      route: '/products',
      icon: 'products',
      children: [
        { name: 'Finished Goods', route: '/products/finished-goods' },
        { name: 'Raw Materials & Packaging', route: '/products/raw-materials' },
        { name: 'Recipes / BOM', route: '/products/bom' },
      ],
    },
    {
      name: 'Production',
      route: '/production',
      icon: 'production',
      children: [
        { name: 'Production Schedule', route: '/production/schedule' },
        { name: 'Production Orders / Batches', route: '/production/orders' },
        { name: 'Machine & Line Status', route: '/production/machines' },
      ],
    },
    {
      name: 'Quality Check',
      route: '/quality',
      icon: 'quality',
      children: [
        { name: 'Raw Material Checks', route: '/quality/raw-materials' },
        { name: 'Finished Product Checks', route: '/quality/finished-goods' },
        { name: 'Damaged / Rejected Stock', route: '/quality/rejected' },
      ],
    },
    {
      name: 'Inventory',
      route: '/inventory',
      icon: 'inventory',
      children: [
        { name: 'Stock Movements & History', route: '/inventory/movements' },
        { name: 'Stock Adjustments', route: '/inventory/adjustments' },
        { name: 'Stock Counts', route: '/inventory/counts' },
      ],
    },
    {
      name: 'Warehouses',
      route: '/warehouses',
      icon: 'warehouses',
      children: [
        { name: 'Warehouse Locations & Zones', route: '/warehouses/locations' },
        { name: 'Stock Transfers', route: '/warehouses/transfers' },
        { name: 'Packing & Dispatch Bay', route: '/warehouses/dispatch-bay' },
      ],
    },
    {
      name: 'Purchases',
      route: '/purchases',
      icon: 'purchases',
      children: [
        { name: 'Purchase Requests', route: '/purchases/requests' },
        { name: 'Requests for Quote (RFQ)', route: '/purchases/rfq' },
        { name: 'Received Stock (GRN)', route: '/purchases/grn' },
      ],
    },
    {
      name: 'Suppliers',
      route: '/suppliers',
      icon: 'suppliers',
      children: [
        { name: 'Supplier Price Lists', route: '/suppliers/price-lists' },
        { name: 'Supplier Contracts & Terms', route: '/suppliers/contracts' },
      ],
    },
    {
      name: 'Customers',
      route: '/customers', // Restored original main route
      icon: 'customers',
      children: [
        { name: 'Customer Pricing & Discounts', route: '/customers/pricing' },
        { name: 'Credit Limits & Balances', route: '/customers/credit-limits' },
        { name: 'Contracts', route: '/customers/contracts' },
      ],
    },
    {
      name: 'Sales',
      route: '/sales',
      icon: 'sales',
      children: [
        { name: 'Quotations', route: '/sales/quotations' },
        { name: 'Sales Contracts', route: '/sales/contracts' },
        { name: 'Customer Returns', route: '/sales/returns' },
      ],
    },
    {
      name: 'Invoices & Payments',
      route: '/invoices',
      icon: 'invoices',
      children: [
        { name: 'Customer Invoices', route: '/invoices/customer' },
        { name: 'Supplier Bills', route: '/invoices/supplier' },
        { name: 'Payments Received & Paid', route: '/invoices/payments' },
      ],
    },
    {
      name: 'Delivery & Fleet',
      route: '/logistics',
      icon: 'logistics',
      children: [
        { name: 'Delivery Schedule', route: '/logistics/schedule' },
        { name: 'Drivers & Vehicles', route: '/logistics/fleet' },
        { name: 'Vehicle Maintenance & Fuel', route: '/logistics/maintenance' },
      ],
    },
    {
      name: 'Accounting',
      route: '/accounting',
      icon: 'accounting',
      children: [
        { name: 'Expenses', route: '/accounting/expenses' },
        { name: 'Profit & Loss', route: '/accounting/profit-loss' },
        { name: 'Tax / VAT Summary', route: '/accounting/vat' },
      ],
    },
    {
      name: 'Staff',
      route: '/staff',
      icon: 'staff',
      children: [
        { name: 'Shift Schedule', route: '/staff/shifts' },
        { name: 'Attendance & Hours', route: '/staff/attendance' },
      ],
    },
    {
      name: 'Reports & Settings',
      route: '/settings',
      icon: 'reports',
      children: [
        { name: 'Users & Permissions', route: '/settings/users' },
        { name: 'Company Settings', route: '/settings/company' },
      ],
    },
  ];

  isExpanded(sectionName: string): boolean {
    return !!this.expandedSections()[sectionName];
  }

  toggleExpand(sectionName: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expandedSections.update((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }

  onMainItemClick(item: NavItem): void {
    if (item.children && item.children.length > 0) {
      this.expandedSections.update((prev) => ({
        ...prev,
        [item.name]: true,
      }));
    }
    this.trackRecent(item.name, item.route);
  }

  isFavorite(route: string): boolean {
    return this.favorites().some((f) => f.route === route);
  }

  toggleFavorite(item: NavSubItem, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isFavorite(item.route)) {
      this.removeFavorite(item.route, event);
    } else {
      const updated = [
        ...this.favorites(),
        { name: item.name, route: item.route },
      ];
      this.favorites.set(updated);
      this.saveFavorites(updated);
    }
  }

  removeFavorite(route: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const updated = this.favorites().filter((f) => f.route !== route);
    this.favorites.set(updated);
    this.saveFavorites(updated);
  }

  trackRecent(name: string, route: string): void {
    const filtered = this.recentlyUsed().filter((r) => r.route !== route);
    const updated = [{ name, route }, ...filtered].slice(0, 4);
    this.recentlyUsed.set(updated);
    try {
      localStorage.setItem(this.RECENT_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  private loadFavorites(): FavoriteItem[] {
    try {
      const saved = localStorage.getItem(this.FAVORITES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}

    return [
      { name: 'Daily Operations', route: '/overview/daily-operations', badge: 12 },
      { name: 'Stock & Warehouse Alerts', route: '/overview/stock-alerts' },
    ];
  }

  private saveFavorites(items: FavoriteItem[]): void {
    try {
      localStorage.setItem(this.FAVORITES_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }

  private loadRecent(): RecentItem[] {
    try {
      const saved = localStorage.getItem(this.RECENT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}

    return [
      { name: 'Production Orders / Batches', route: '/production/orders' },
      { name: 'Stock Movements & History', route: '/inventory/movements' },
      { name: 'Received Stock (GRN)', route: '/purchases/grn' },
    ];
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}