import { Component, computed, signal } from '@angular/core';
import { NewLocationForm } from '../new-location-form/new-location-form';
import { EditLocationForm } from '../edit-location-form/edit-location-form';
import { DeleteLocationForm } from '../delete-location-form/delete-location-form';

export type LocationType = 'Cold Room' | 'Blast Freezer' | 'Dry Store' | 'Production Bay';

export interface LocationRecord {
  id: string;
  code: string;
  name: string;
  locationType: LocationType;
  department: string;
  temperatureTarget: string;
  capacityUnits: number;
  currentStockUnits: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-locations-list-widget',
  imports: [NewLocationForm, EditLocationForm, DeleteLocationForm],
  templateUrl: './locations-list-widget.html',
  styleUrl: './locations-list-widget.css',
})
export class LocationsListWidget {
  typeFilter = signal<'All' | LocationType>('All');
  statusFilter = signal<'All' | 'Active' | 'Inactive'>('All');
  searchQuery = signal('');
  showNewModal = signal(false);
  editingLocation = signal<LocationRecord | null>(null);
  deletingLocation = signal<LocationRecord | null>(null);

  locations = signal<LocationRecord[]>([
    {
      id: 'LOC-1',
      code: 'LOC-CR-01',
      name: 'Cold Room A - Bagged Ice',
      locationType: 'Cold Room',
      department: 'Bagging, Palletizing & Cold Storage',
      temperatureTarget: '-18°C to -22°C',
      capacityUnits: 3000,
      currentStockUnits: 2280,
      status: 'Active',
    },
    {
      id: 'LOC-2',
      code: 'LOC-BF-01',
      name: 'Blast Freezer B - Block Ice',
      locationType: 'Blast Freezer',
      department: 'Ice Freezing & Chiller Plant',
      temperatureTarget: '-24°C to -28°C',
      capacityUnits: 800,
      currentStockUnits: 310,
      status: 'Active',
    },
    {
      id: 'LOC-3',
      code: 'LOC-DS-01',
      name: 'Packaging Store - Dry Goods',
      locationType: 'Dry Store',
      department: 'Bagging, Palletizing & Cold Storage',
      temperatureTarget: '15°C to 25°C',
      capacityUnits: 250,
      currentStockUnits: 48,
      status: 'Active',
    },
    {
      id: 'LOC-4',
      code: 'LOC-PR-01',
      name: 'Plant Room - Consumables',
      locationType: 'Production Bay',
      department: 'Ice Freezing & Chiller Plant',
      temperatureTarget: 'Ambient',
      capacityUnits: 120,
      currentStockUnits: 24,
      status: 'Active',
    },
  ]);

  filteredLocations = computed(() => {
    const tf = this.typeFilter();
    const st = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.locations().filter((loc) => {
      const matchesType = tf === 'All' || loc.locationType === tf;
      const matchesStatus = st === 'All' || loc.status === st;
      const matchesQuery =
        !q ||
        loc.code.toLowerCase().includes(q) ||
        loc.name.toLowerCase().includes(q) ||
        loc.department.toLowerCase().includes(q) ||
        loc.locationType.toLowerCase().includes(q);
      return matchesType && matchesStatus && matchesQuery;
    });
  });

  getUtilizationPct(loc: LocationRecord): number {
    if (!loc.capacityUnits) return 0;
    return Math.min(100, Math.round((loc.currentStockUnits / loc.capacityUnits) * 100));
  }

  addLocation(newItem: Omit<LocationRecord, 'id'>) {
    const created: LocationRecord = {
      ...newItem,
      id: `LOC-${Date.now().toString().slice(-4)}`,
    };
    this.locations.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateLocation(updated: LocationRecord) {
    this.locations.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingLocation.set(null);
  }

  deleteLocation(id: string) {
    this.locations.update((list) => list.filter((item) => item.id !== id));
    this.deletingLocation.set(null);
  }
}