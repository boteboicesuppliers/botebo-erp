import { Component, effect, input, output, signal } from '@angular/core';
import {
  MaterialCheckStatus,
  RawMaterialCheckRecord,
} from '../raw-materials-checks-list-widget/raw-materials-checks-list-widget';

@Component({
  selector: 'app-edit-raw-material-check-form',
  imports: [],
  templateUrl: './edit-raw-material-check-form.html',
  styleUrl: './edit-raw-material-check-form.css',
})
export class EditRawMaterialCheckForm {
  check = input.required<RawMaterialCheckRecord>();
  close = output<void>();
  save = output<RawMaterialCheckRecord>();

  checkCode = signal('');
  materialName = signal('');
  supplierName = signal('');
  grnOrLotRef = signal('');
  parameterMeasured = signal('');
  specTarget = signal('');
  status = signal<MaterialCheckStatus>('Approved');
  checkedDate = signal('');
  inspector = signal('');

  constructor() {
    effect(() => {
      const c = this.check();
      this.checkCode.set(c.checkCode);
      this.materialName.set(c.materialName);
      this.supplierName.set(c.supplierName);
      this.grnOrLotRef.set(c.grnOrLotRef);
      this.parameterMeasured.set(c.parameterMeasured);
      this.specTarget.set(c.specTarget);
      this.status.set(c.status);
      this.checkedDate.set(c.checkedDate);
      this.inspector.set(c.inspector);
    });
  }

  submit(): void {
    if (!this.materialName().trim() || !this.parameterMeasured().trim()) return;
    this.save.emit({
      id: this.check().id,
      checkCode: this.checkCode().trim(),
      materialName: this.materialName().trim(),
      supplierName: this.supplierName().trim(),
      grnOrLotRef: this.grnOrLotRef().trim(),
      parameterMeasured: this.parameterMeasured().trim(),
      specTarget: this.specTarget().trim(),
      status: this.status(),
      checkedDate: this.checkedDate(),
      inspector: this.inspector().trim(),
    });
  }
}