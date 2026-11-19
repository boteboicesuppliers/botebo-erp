import { Component, effect, input, output, signal } from '@angular/core';
import {
  GrnEntryRecord,
  GrnQaStatus,
} from '../grn-list-widget/grn-list-widget';

@Component({
  selector: 'app-edit-grn-entry-form',
  imports: [],
  templateUrl: './edit-grn-entry-form.html',
  styleUrl: './edit-grn-entry-form.css',
})
export class EditGrnEntryForm {
  grn = input.required<GrnEntryRecord>();
  close = output<void>();
  save = output<GrnEntryRecord>();

  poRef = signal('');
  supplier = signal('');
  receivedDate = signal('');
  itemsChecked = signal('');
  warehouse = signal('');
  qaStatus = signal<GrnQaStatus>('Passed');
  submitted = signal(false);

  constructor() {
    effect(() => {
      const current = this.grn();
      this.poRef.set(current.poRef);
      this.supplier.set(current.supplier);
      this.receivedDate.set(current.receivedDate);
      this.itemsChecked.set(current.itemsChecked);
      this.warehouse.set(current.warehouse);
      this.qaStatus.set(current.qaStatus);
    });
  }

  submitEdit() {
    this.submitted.set(true);
    if (!this.supplier().trim() || !this.itemsChecked().trim()) {
      return;
    }

    const current = this.grn();
    this.save.emit({
      ...current,
      poRef: this.poRef().trim() || current.poRef,
      supplier: this.supplier().trim(),
      receivedDate: this.receivedDate(),
      itemsChecked: this.itemsChecked().trim(),
      warehouse: this.warehouse(),
      qaStatus: this.qaStatus(),
    });
  }
}