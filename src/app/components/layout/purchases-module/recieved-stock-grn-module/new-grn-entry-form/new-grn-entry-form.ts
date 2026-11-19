import { Component, output, signal } from '@angular/core';
import {
  GrnEntryRecord,
  GrnQaStatus,
} from '../grn-list-widget/grn-list-widget';

@Component({
  selector: 'app-new-grn-entry-form',
  imports: [],
  templateUrl: './new-grn-entry-form.html',
  styleUrl: './new-grn-entry-form.css',
})
export class NewGrnEntryForm {
  close = output<void>();
  save = output<Omit<GrnEntryRecord, 'id'>>();

  poRef = signal('PO-2026-0414');
  supplier = signal('');
  receivedDate = signal('2026-11-19');
  itemsChecked = signal('');
  warehouse = signal('Pretoria Cold Storage Hub');
  qaStatus = signal<GrnQaStatus>('Passed');
  submitted = signal(false);

  submitForm() {
    this.submitted.set(true);
    if (!this.supplier().trim() || !this.itemsChecked().trim()) {
      return;
    }

    this.save.emit({
      poRef: this.poRef().trim() || 'PO-2026-0000',
      supplier: this.supplier().trim(),
      receivedDate: this.receivedDate(),
      itemsChecked: this.itemsChecked().trim(),
      warehouse: this.warehouse(),
      qaStatus: this.qaStatus(),
    });
  }
}