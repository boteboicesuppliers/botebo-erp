import { Component, output, signal } from '@angular/core';
import { PurchaseRequisitionRecord } from '../purchase-request-list-widget/purchase-request-list-widget';

@Component({
  selector: 'app-new-requisition-form',
  imports: [],
  templateUrl: './new-requisition-form.html',
  styleUrl: './new-requisition-form.css',
})
export class NewRequisitionForm {
  close = output<void>();
  save = output<Omit<PurchaseRequisitionRecord, 'id'>>();

  item = signal('');
  qty = signal('');
  department = signal('Production Line A');
  requestedBy = signal('');
  date = signal('2026-11-18');
  status = signal('Pending Approval');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.item().trim() || !this.qty().trim() || !this.requestedBy().trim()) {
      return;
    }

    this.save.emit({
      item: this.item().trim(),
      qty: this.qty().trim(),
      department: this.department(),
      requestedBy: this.requestedBy().trim(),
      date: this.date(),
      status: this.status(),
    });
  }
}