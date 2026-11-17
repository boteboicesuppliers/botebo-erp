import { Component } from '@angular/core';
import { ProductionSchedule } from '../../layout/production-module/production-schedule/production-schedule';
import { ProductionOrdersAndBatches } from '../../layout/production-module/production-orders-and-batches/production-orders-and-batches';
import { MachineAndLineStatus } from '../../layout/production-module/machine-and-line-status/machine-and-line-status';

@Component({
  selector: 'app-production-module',
  imports: [
    ProductionSchedule,
    ProductionOrdersAndBatches,
    MachineAndLineStatus,
  ],
  templateUrl: './production-module.html',
  styleUrl: './production-module.css',
})
export class ProductionModule {
  // Main container shell combining all production sub-components
}