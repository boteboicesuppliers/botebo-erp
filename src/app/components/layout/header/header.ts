
import {
  Component,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import {
  NavigationEnd,
  Router
} from '@angular/router';

import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnDestroy {

  // ==========================================
  // LOGGED-IN USER
  // ==========================================

  // Replace with authenticated user information later.
  firstName = 'User';

  get userInitial(): string {
    return this.firstName.charAt(0).toUpperCase() || 'U';
  }


  // ==========================================
  // PAGE TITLE AND BREADCRUMBS
  // ==========================================

  pageTitle = 'Dashboard';

  breadcrumbs: string[] = [];

  private routerSubscription?: Subscription;


  // ==========================================
  // SEARCH CONFIGURATION
  // ==========================================

  searchPlaceholder = 'Search by order ID...';

  searchPlaceholders: { [key: string]: string } = {

    Order: 'Search by order ID...',

    Customer: 'Search by customer name...',

    Supplier: 'Search by supplier name...',

    Invoice: 'Search by invoice number...',

    Quotation: 'Search by quotation number...'

  };


  // ==========================================
  // SEARCH EVENT
  // ==========================================

  @Output() searchSubmitted = new EventEmitter<{
    type: string;
    query: string;
  }>();


  // ==========================================
  // CONSTRUCTOR AND ROUTER LISTENER
  // ==========================================

  constructor(private router: Router) {

    this.updatePageInfo();

    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.updatePageInfo();
      });

  }


  // ==========================================
  // UPDATE SEARCH PLACEHOLDER
  // ==========================================

  updateSearchPlaceholder(type: string): void {

    this.searchPlaceholder =
      this.searchPlaceholders[type] || 'Search...';

  }


  // ==========================================
  // UPDATE PAGE TITLE AND BREADCRUMBS
  // ==========================================

  updatePageInfo(): void {

    const url = this.router.url
      .split('?')[0]
      .split('#')[0];

    const segments = url
      .split('/')
      .filter(segment => segment.length > 0);

    if (segments.length === 0) {

      this.pageTitle = 'Dashboard';

      this.breadcrumbs = [];

      return;

    }

    const route = segments[0];

    const pages: {
      [key: string]: {
        title: string;
        section: string;
      }
    } = {

      dashboard: {
        title: 'Dashboard',
        section: ''
      },

      inventory: {
        title: 'Inventory',
        section: 'Inventory'
      },

      'sales-orders': {
        title: 'Sales Orders',
        section: 'Sales'
      },

      customers: {
        title: 'Customers',
        section: 'Sales'
      },

      suppliers: {
        title: 'Suppliers',
        section: 'Procurement'
      },

      logistics: {
        title: 'Logistics',
        section: 'Operations'
      },

      financials: {
        title: 'Financials',
        section: 'Finance'
      },

      analytics: {
        title: 'Analytics',
        section: 'Reports'
      },

      invoices: {
        title: 'Invoices',
        section: 'Sales'
      },

      quotations: {
        title: 'Quotations',
        section: 'Sales'
      }

    };


    const currentPage = pages[route] || {

      title: this.formatRouteName(route),

      section: 'General'

    };


    this.pageTitle = currentPage.title;


    this.breadcrumbs = currentPage.section

      ? [currentPage.section, currentPage.title]

      : [];

  }


  // ==========================================
  // FORMAT ROUTE NAMES
  // ==========================================

  formatRouteName(route: string): string {

    return route

      .split('-')

      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )

      .join(' ');

  }


  // ==========================================
  // SEARCH HANDLER
  // ==========================================

  onSearch(
    event: Event,
    query: string,
    type: string
  ): void {

    event.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery) {
      return;
    }

    this.searchSubmitted.emit({

      type,

      query: searchQuery

    });

  }


  // ==========================================
  // CLEANUP
  // ==========================================

  ngOnDestroy(): void {

    this.routerSubscription?.unsubscribe();

  }

}
