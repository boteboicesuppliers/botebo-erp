import { Component, computed, signal } from '@angular/core';

export type DispatchQueueStatus = 'Ready to Load' | 'Dispatched' | 'Delayed';

export interface DispatchQueueRecord {
  id: string;
  tripCode: string;
  orderRef: string;
  customer: string;
  itemsSummary: string;
  driver: string;
  etaSlot: string;
  status: DispatchQueueStatus;
}

@Component({
  selector: 'app-dispatch-queue-widget',
  imports: [],
  templateUrl: './dispatch-queue-widget.html',
  styleUrl: './dispatch-queue-widget.css',
})
export class DispatchQueueWidget {
  statusFilter = signal<'All' | DispatchQueueStatus>('All');
  searchQuery = signal('');

  queue = signal<DispatchQueueRecord[]>([
    {
      id: 'DQ-1',
      tripCode: 'TRP-204',
      orderRef: 'SO-1088',
      customer: 'Suncrest Hospitality Group',
      itemsSummary: '240 x 2kg Party Cube Ice',
      driver: 'K. Mahlangu',
      etaSlot: '08:15',
      status: 'Dispatched',
    },
    {
      id: 'DQ-2',
      tripCode: 'TRP-205',
      orderRef: 'SO-1091',
      customer: 'Highveld Liquor & Mart',
      itemsSummary: '350 x 5kg Commercial Ice',
      driver: 'T. Dlamini',
      etaSlot: '09:00',
      status: 'Ready to Load',
    },
    {
      id: 'DQ-3',
      tripCode: 'TRP-206',
      orderRef: 'SO-1094',
      customer: 'AquaCold Events & Catering',
      itemsSummary: '85 x 10kg Block Ice',
      driver: 'P. Sithole',
      etaSlot: '10:30',
      status: 'Delayed',
    },
    {
      id: 'DQ-4',
      tripCode: 'TRP-207',
      orderRef: 'SO-1097',
      customer: 'Metro Forecourt & Convenience',
      itemsSummary: '180 x 2kg Party Cube Ice',
      driver: 'K. Mahlangu',
      etaSlot: '11:15',
      status: 'Ready to Load',
    },
  ]);

  filteredQueue = computed(() => {
    const status = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.queue().filter((row) => {
      const matchesStatus = status === 'All' || row.status === status;
      const matchesQuery =
        !q ||
        row.tripCode.toLowerCase().includes(q) ||
        row.orderRef.toLowerCase().includes(q) ||
        row.customer.toLowerCase().includes(q) ||
        row.driver.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  });
}