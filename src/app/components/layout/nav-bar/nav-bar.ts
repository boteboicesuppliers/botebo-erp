
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  navigation = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Inventory', route: '/inventory' },
    { name: 'Sales Orders', route: '/sales-orders' },
    { name: 'Customers', route: '/customers' },
    { name: 'Suppliers', route: '/suppliers' },
    { name: 'Logistics', route: '/logistics' },
    { name: 'Financials', route: '/financials' },
    { name: 'Analytics', route: '/analytics' },
  ];

}
