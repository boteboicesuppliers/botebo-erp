import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-purchase-requests',
  imports: [],
  templateUrl: './purchase-requests.html',
  styleUrl: './purchase-requests.css',
})
export class PurchaseRequests {
  requests = signal([
    { id: 'PR-2026-0101', item: 'Food-Grade Ammonia Refrigerant', qty: '500 kg', department: 'Production Line A', requestedBy: 'S. Khumalo', status: 'Approved', date: '2026-11-16' },
    { id: 'PR-2026-0102', item: 'Heavy-Duty LDPE Packaging Film', qty: '2,000 rolls', department: 'Packaging Plant', requestedBy: 'J. Mthethwa', status: 'Pending Approval', date: '2026-11-17' },
    { id: 'PR-2026-0103', item: 'Stainless Steel Water Filtration Filters', qty: '12 units', department: 'Maintenance', requestedBy: 'P. van der Merwe', status: 'Approved', date: '2026-11-15' },
  ]);

  getStatusBadge(status: string): string {
    return status === 'Approved' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900';
  }
}