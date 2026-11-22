import { Component, effect, input, output, signal } from '@angular/core';
import {
  CheckResultStatus,
  FinishedProductCheckRecord,
} from '../finished-product-checks-list-widget/finished-product-checks-list-widget';

@Component({
  selector: 'app-edit-finished-product-check-form',
  imports: [],
  templateUrl: './edit-finished-product-check-form.html',
  styleUrl: './edit-finished-product-check-form.css',
})
export class EditFinishedProductCheckForm {
  check = input.required<FinishedProductCheckRecord>();
  close = output<void>();
  save = output<FinishedProductCheckRecord>();

  checkCode = signal('');
  productName = signal('');
  batchNumber = signal('');
  coreTempC = signal(0);
  bagWeightCheck = signal('');
  sealAndClarityPass = signal(true);
  result = signal<CheckResultStatus>('Passed');
  checkedDate = signal('');
  inspector = signal('');
  notes = signal('');

  constructor() {
    effect(() => {
      const c = this.check();
      this.checkCode.set(c.checkCode);
      this.productName.set(c.productName);
      this.batchNumber.set(c.batchNumber);
      this.coreTempC.set(c.coreTempC);
      this.bagWeightCheck.set(c.bagWeightCheck);
      this.sealAndClarityPass.set(c.sealAndClarityPass);
      this.result.set(c.result);
      this.checkedDate.set(c.checkedDate);
      this.inspector.set(c.inspector);
      this.notes.set(c.notes);
    });
  }

  submit(): void {
    if (!this.productName().trim() || !this.batchNumber().trim()) return;
    this.save.emit({
      id: this.check().id,
      checkCode: this.checkCode().trim(),
      productName: this.productName().trim(),
      batchNumber: this.batchNumber().trim(),
      coreTempC: Number(this.coreTempC()) || 0,
      bagWeightCheck: this.bagWeightCheck().trim(),
      sealAndClarityPass: this.sealAndClarityPass(),
      result: this.result(),
      checkedDate: this.checkedDate(),
      inspector: this.inspector().trim(),
      notes: this.notes().trim(),
    });
  }
}