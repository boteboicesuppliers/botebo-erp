import { Component, effect, input, output, signal } from '@angular/core';
import { PurchaseRequisitionRecord } from '../purchase-request-list-widget/purchase-request-list-widget';

@Component({
  selector: 'app-edit-requisition-form',
  imports: [],
  templateUrl: './edit-requisition-form.html',
  styleUrl: './edit-requisition-form.css',
})
export class EditRequisitionForm {
  requisition = input.required<PurchaseRequisitionRecord>();
  close = output<void>();
  save = output<PurchaseRequisitionRecord>();

  item = signal('');
  qty = signal('');
  department = signal('');
  requestedBy = signal('');
  date = signal('');
  status = signal('');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const req = this.requisition();
      this.item.set(req.item);
      this.qty.set(req.qty);
      this.department.set(req.department);
      this.requestedBy.set(req.requestedBy);
      this.date.set(req.date);
      this.status.set(req.status);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.item().trim() || !this.qty().trim() || !this.requestedBy().trim()) {
      return;
    }

    const current = this.requisition();
    this.save.emit({
      ...current,
      item: this.item().trim(),
      qty: this.qty().trim(),
      department: this.department(),
      requestedBy: this.requestedBy().trim(),
      date: this.date(),
      status: this.status(),
    });
  }
}