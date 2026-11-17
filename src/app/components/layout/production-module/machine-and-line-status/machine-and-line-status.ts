import { Component } from '@angular/core';

@Component({
  selector: 'app-machine-and-line-status',
  imports: [],
  templateUrl: './machine-and-line-status.html',
  styleUrl: './machine-and-line-status.css',
})
export class MachineAndLineStatus {
  lines = [
    { id: 'LINE-01', name: 'Ice Block Extrusion Line A', status: 'Running', output: '4.2 tons/hr', temp: '-18.4°C', operator: 'S. Khumalo' },
    { id: 'LINE-02', name: 'Bagged Ice Packaging Line B', status: 'Running', output: '2,800 bags/hr', temp: '-16.2°C', operator: 'J. Mthethwa' },
    { id: 'LINE-03', name: 'Crushed Ice Commercial Unit C', status: 'Maintenance', output: '0 tons/hr', temp: '-4.1°C', operator: 'P. van der Merwe' },
    { id: 'LINE-04', name: 'Cold Storage Freezing Vault D', status: 'Optimal', output: 'Capacity 94%', temp: '-22.0°C', operator: 'Automated' },
  ];

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Running':
      case 'Optimal':
        return 'bg-emerald-100 text-emerald-900';
      case 'Maintenance':
        return 'bg-amber-100 text-amber-900';
      default:
        return 'bg-red-100 text-red-900';
    }
  }
}