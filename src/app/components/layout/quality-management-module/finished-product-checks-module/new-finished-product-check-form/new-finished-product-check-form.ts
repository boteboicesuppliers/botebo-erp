import { Component, output, signal } from '@angular/core';
import {
  CheckResultStatus,
  FinishedProductCheckRecord,
} from '../finished-product-checks-list-widget/finished-product-checks-list-widget';

@Component({
  selector: 'app-new-finished-product-check-form',
  imports: [],
  templateUrl: './new-finished-product-check-form.html',
  styleUrl: './new-finished-product-check-form.css',
})
export class NewFinishedProductCheckForm {
  close = output<void>();
  save = output<Omit<FinishedProductCheckRecord, 'id'>>();

  checkCode = signal('QCF-2026-044');
  productName = signal('');
  batchNumber = signal('');
  coreTempC = signal(-6);
  bagWeightCheck = signal('');
  sealAndClarityPass = signal(true);
  result = signal<CheckResultStatus>('Passed');
  checkedDate = signal(new Date().toISOString().slice(0, 10));
  inspector = signal('');
  notes = signal('');

  submit(): void {
    if (!this.productName().trim() || !this.batchNumber().trim()) return;
    this.save.emit({
      checkCode: this.checkCode().trim() || 'QCF-NEW',
      productName: this.productName().trim(),
      batchNumber: this.batchNumber().trim(),
      coreTempC: Number(this.coreTempC()) || 0,
      bagWeightCheck: this.bagWeightCheck().trim() || 'Verified',
      sealAndClarityPass: this.sealAndClarityPass(),
      result: this.result(),
      checkedDate: this.checkedDate(),
      inspector: this.inspector().trim() || 'QC Inspector',
      notes: this.notes().trim(),
    });
  }
}