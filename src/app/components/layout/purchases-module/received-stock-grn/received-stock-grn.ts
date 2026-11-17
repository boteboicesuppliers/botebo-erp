import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-received-stock-grn',
  imports: [],
  templateUrl: './received-stock-grn.html',
  styleUrl: './received-stock-grn.css',
})
export class ReceivedStockGrn {
  grns = signal([
    { id: 'GRN-2026-0891', poRef: 'PO-2026-0150', supplier: 'Gauteng Chemical Supplies', receivedDate: '2026-11-16', itemsChecked: '500 kg Ammonia', warehouse: 'Johannesburg Cold Store', qaStatus: 'Passed' },
    { id: 'GRN-2026-0892', poRef: 'PO-2026-0152', supplier: 'Mpumalanga Packaging Corp', receivedDate: '2026-11-15', itemsChecked: '2,000 rolls LDPE', warehouse: 'Midrand Depot', qaStatus: 'Passed' },
  ]);
}