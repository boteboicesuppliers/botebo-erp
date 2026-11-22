import { Component, output, signal } from '@angular/core';
import {
  MaterialCheckStatus,
  RawMaterialCheckRecord,
} from '../raw-materials-checks-list-widget/raw-materials-checks-list-widget';

@Component({
  selector: 'app-new-raw-material-check-form',
  imports: [],
  templateUrl: './new-raw-material-check-form.html',
  styleUrl: './new-raw-material-check-form.css',
})
export class NewRawMaterialCheckForm {
  close = output<void>();
  save = output<Omit<RawMaterialCheckRecord, 'id'>>();

  checkCode = signal('QCR-2026-031');
  materialName = signal('');
  supplierName = signal('');
  grnOrLotRef = signal('');
  parameterMeasured = signal('');
  specTarget = signal('');
  status = signal<MaterialCheckStatus>('Approved');
  checkedDate = signal(new Date().toISOString().slice(0, 10));
  inspector = signal('');

  submit(): void {
    if (!this.materialName().trim() || !this.parameterMeasured().trim()) return;
    this.save.emit({
      checkCode: this.checkCode().trim() || 'QCR-NEW',
      materialName: this.materialName().trim(),
      supplierName: this.supplierName().trim() || 'Unspecified Supplier',
      grnOrLotRef: this.grnOrLotRef().trim() || 'N/A',
      parameterMeasured: this.parameterMeasured().trim(),
      specTarget: this.specTarget().trim() || 'Standard Spec',
      status: this.status(),
      checkedDate: this.checkedDate(),
      inspector: this.inspector().trim() || 'QC Inspector',
    });
  }
}