import { Component, computed, signal } from '@angular/core';

export type ZoneRunStatus = 'Pending Dispatch' | 'Loading' | 'On Route' | 'Completed';

export interface RouteZoneRecord {
  id: string;
  zoneCode: string;
  zoneName: string;
  areaCoverage: string;
  scheduledStops: number;
  loadSummary: string;
  dispatchWindow: string;
  assignedVehicle: string;
  status: ZoneRunStatus;
}

@Component({
  selector: 'app-route-zones-widget',
  imports: [],
  templateUrl: './route-zones-widget.html',
  styleUrl: './route-zones-widget.css',
})
export class RouteZonesWidget {
  statusFilter = signal<'All' | ZoneRunStatus>('All');
  searchQuery = signal('');

  zones = signal<RouteZoneRecord[]>([
    {
      id: 'RZ-1',
      zoneCode: 'ZN-01',
      zoneName: 'Central & Hospitality Corridor',
      areaCoverage: 'CBD, Restaurants, Hotels & Lounges',
      scheduledStops: 9,
      loadSummary: '580 Bags / 45 Blocks',
      dispatchWindow: '06:30 – 09:30',
      assignedVehicle: 'TRK-01 (3t Chiller)',
      status: 'On Route',
    },
    {
      id: 'RZ-2',
      zoneCode: 'ZN-02',
      zoneName: 'North Retail & Bottle Stores',
      areaCoverage: 'Liquor Outlets, Forecourts & Mini-Marts',
      scheduledStops: 7,
      loadSummary: '740 Bags',
      dispatchWindow: '07:15 – 10:30',
      assignedVehicle: 'TRK-02 (4t Refrigerated)',
      status: 'Loading',
    },
    {
      id: 'RZ-3',
      zoneCode: 'ZN-03',
      zoneName: 'East Industrial & Events',
      areaCoverage: 'Cold Storage Drops, Venues & Bulk Ice',
      scheduledStops: 5,
      loadSummary: '190 Blocks / 120 Bags',
      dispatchWindow: '09:00 – 12:00',
      assignedVehicle: 'TRK-03 (5t Freezer)',
      status: 'Pending Dispatch',
    },
    {
      id: 'RZ-4',
      zoneCode: 'ZN-04',
      zoneName: 'Early Morning Express Loop',
      areaCoverage: '24-Hour Convenience & High-Volume Accounts',
      scheduledStops: 6,
      loadSummary: '490 Bags',
      dispatchWindow: '05:00 – 06:45',
      assignedVehicle: 'VAN-01 (1.5t Chiller)',
      status: 'Completed',
    },
  ]);

  filteredZones = computed(() => {
    const status = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.zones().filter((z) => {
      const matchesStatus = status === 'All' || z.status === status;
      const matchesQuery =
        !q ||
        z.zoneCode.toLowerCase().includes(q) ||
        z.zoneName.toLowerCase().includes(q) ||
        z.areaCoverage.toLowerCase().includes(q) ||
        z.assignedVehicle.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  });

  totalStops = computed(() =>
    this.filteredZones().reduce((sum, z) => sum + z.scheduledStops, 0)
  );
}