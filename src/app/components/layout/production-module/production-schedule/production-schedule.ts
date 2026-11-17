import { Component } from '@angular/core';

@Component({
  selector: 'app-production-schedule',
  imports: [],
  templateUrl: './production-schedule.html',
  styleUrl: './production-schedule.css',
})
export class ProductionSchedule {
  schedule = [
    { batchId: 'BATCH-8810', product: '10kg Commercial Ice Blocks', targetQty: '1,200 blocks', line: 'Line A', shift: 'Morning (06:00 - 14:00)', supervisor: 'S. Khumalo', status: 'In Progress' },
    { batchId: 'BATCH-8811', product: '5kg Party Ice Bags', targetQty: '3,500 bags', line: 'Line B', shift: 'Morning (06:00 - 14:00)', supervisor: 'J. Mthethwa', status: 'In Progress' },
    { batchId: 'BATCH-8812', product: 'Crushed Ice 25kg Bulk', targetQty: '450 bags', line: 'Line C', shift: 'Afternoon (14:00 - 22:00)', supervisor: 'P. van der Merwe', status: 'Scheduled' },
    { batchId: 'BATCH-8813', product: '10kg Commercial Ice Blocks', targetQty: '1,200 blocks', line: 'Line A', shift: 'Night (22:00 - 06:00)', supervisor: 'T. Mokoena', status: 'Queued' },
  ];

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'In Progress':
        return 'bg-sky-100 text-sky-900';
      case 'Scheduled':
        return 'bg-emerald-100 text-emerald-900';
      default:
        return 'bg-amber-100 text-amber-900';
    }
  }
}