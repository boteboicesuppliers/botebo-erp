import { Component, computed, signal } from '@angular/core';

type Stage = 'Pending Dispatch' | 'In Packing Bay' | 'In Transit' | 'Delivered Today';
type DockState = 'Loading' | 'Waiting for truck' | 'Free' | 'Out of service';

interface Shipment {
  id: string;
  client: string;
  zone: string;
  driver: string;
  carrier: string;
  stage: Stage;
  milestone: string;
}

@Component({
  selector: 'app-orders-and-shipping-overview',
  imports: [],
  templateUrl: './orders-and-shipping-overview.html',
  styleUrl: './orders-and-shipping-overview.css',
})
export class OrdersAndShippingOverview {
  readonly tabs: Stage[] = ['Pending Dispatch', 'In Packing Bay', 'In Transit', 'Delivered Today'];
  status = signal<Stage>('Pending Dispatch');

  shipments: Shipment[] = [
    { id: 'SO-2101', client: 'Mabena Industrial', zone: 'Johannesburg · Zone A', driver: 'Unassigned', carrier: 'Own fleet', stage: 'Pending Dispatch', milestone: 'Awaiting driver' },
    { id: 'SO-2097', client: 'Durban Supplies', zone: 'Johannesburg · Zone C', driver: 'S. Mokoena', carrier: 'Own fleet', stage: 'Pending Dispatch', milestone: 'Ready for loading' },
    { id: 'SO-2098', client: 'Pretoria Hardware', zone: 'Johannesburg · Zone B', driver: 'T. Nkosi', carrier: 'Own fleet', stage: 'Pending Dispatch', milestone: 'Awaiting delivery note' },
    { id: 'SO-2099', client: 'Karoo Mining Supplies', zone: 'Johannesburg · Zone A', driver: 'J. Pretorius', carrier: 'Fastway Freight', stage: 'In Packing Bay', milestone: 'Packing 65%' },
    { id: 'SO-2094', client: 'Highveld Fasteners', zone: 'Johannesburg · Zone D', driver: 'Unassigned', carrier: 'Own fleet', stage: 'In Packing Bay', milestone: 'Palletising' },
    { id: 'SO-2090', client: 'Nelspruit Traders', zone: 'Johannesburg · Zone B', driver: 'M. Dube', carrier: 'RoadLink Carriers', stage: 'In Transit', milestone: 'Departed depot 06:40' },
    { id: 'SO-2088', client: 'Cape Engineering', zone: 'Johannesburg · Zone C', driver: 'A. Jacobs', carrier: 'Cape Haul', stage: 'In Transit', milestone: 'Passed Bloemfontein' },
    { id: 'SO-2092', client: 'Free State Agri', zone: 'Johannesburg · Zone A', driver: 'P. Mahlangu', carrier: 'RoadLink Carriers', stage: 'In Transit', milestone: 'Arriving 14:30' },
    { id: 'SO-2085', client: 'Limpopo Logistics', zone: 'Johannesburg · Zone D', driver: 'K. Sithole', carrier: 'Own fleet', stage: 'Delivered Today', milestone: 'POD signed 09:15' },
    { id: 'SO-2083', client: 'Gauteng Rail Works', zone: 'Johannesburg · Zone B', driver: 'B. Khumalo', carrier: 'Own fleet', stage: 'Delivered Today', milestone: 'POD signed 10:05' },
  ];

  rows = computed(() => this.shipments.filter((s) => s.stage === this.status()));
  counts = computed(() => {
    const out = {} as Record<Stage, number>;
    for (const t of this.tabs) out[t] = this.shipments.filter((s) => s.stage === t).length;
    return out;
  });

  // LOADING BAY CAPACITY
  docks: { name: string; state: DockState; ref: string }[] = [
    { name: 'Dock 1', state: 'Loading', ref: 'SO-2097' },
    { name: 'Dock 2', state: 'Loading', ref: 'SO-2101' },
    { name: 'Dock 3', state: 'Loading', ref: 'SO-2098' },
    { name: 'Dock 4', state: 'Waiting for truck', ref: 'Carrier due 13:00' },
    { name: 'Dock 5', state: 'Loading', ref: 'SO-2099' },
    { name: 'Dock 6', state: 'Free', ref: 'Available' },
    { name: 'Dock 7', state: 'Free', ref: 'Available' },
    { name: 'Dock 8', state: 'Out of service', ref: 'Door repair' },
  ];
  busy = computed(() => this.docks.filter((d) => d.state === 'Loading' || d.state === 'Waiting for truck').length);
  utilisation = computed(() => Math.round((this.busy() / this.docks.length) * 100));

  bayMetrics = [
    { label: 'Trucks loaded today', value: '14 of 18', note: 'scheduled' },
    { label: 'Average truck turnaround', value: '42 min', note: 'target 45' },
    { label: 'On-time departures', value: '92%', note: '+3% vs last week' },
  ];

  badge(stage: Stage): string {
    switch (stage) {
      case 'Pending Dispatch': return 'bg-amber-100 text-amber-900';
      case 'In Packing Bay': return 'bg-purple-100 text-purple-900';
      case 'In Transit': return 'bg-sky-100 text-sky-900';
      default: return 'bg-emerald-100 text-emerald-900';
    }
  }

  dockClass(state: DockState): string {
    switch (state) {
      case 'Loading': return 'bg-sky-100 text-sky-900';
      case 'Waiting for truck': return 'bg-amber-100 text-amber-900';
      case 'Free': return 'bg-emerald-100 text-emerald-900';
      default: return 'bg-red-100 text-red-900';
    }
  }
}