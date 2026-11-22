import { Component, computed, signal } from '@angular/core';
import { NewRawMaterialCheckForm } from '../new-raw-material-check-form/new-raw-material-check-form';
import { EditRawMaterialCheckForm } from '../edit-raw-material-check-form/edit-raw-material-check-form';
import { DeleteRawMaterialCheckForm } from '../delete-raw-material-check-form/delete-raw-material-check-form';

export type MaterialCheckStatus = 'Approved' | 'On Hold' | 'Rejected';

export interface RawMaterialCheckRecord {
  id: string;
  checkCode: string;
  materialName: string;
  supplierName: string;
  grnOrLotRef: string;
  parameterMeasured: string;
  specTarget: string;
  status: MaterialCheckStatus;
  checkedDate: string;
  inspector: string;
}

@Component({
  selector: 'app-raw-materials-checks-list-widget',
  imports: [
    NewRawMaterialCheckForm,
    EditRawMaterialCheckForm,
    DeleteRawMaterialCheckForm,
  ],
  templateUrl: './raw-materials-checks-list-widget.html',
  styleUrl: './raw-materials-checks-list-widget.css',
})
export class RawMaterialsChecksListWidget {
  statusFilter = signal<'All' | MaterialCheckStatus>('All');
  searchQuery = signal('');

  showNewModal = signal(false);
  editingCheck = signal<RawMaterialCheckRecord | null>(null);
  deletingCheck = signal<RawMaterialCheckRecord | null>(null);

  checks = signal<RawMaterialCheckRecord[]>([
    {
      id: 'RMC-1',
      checkCode: 'QCR-2026-028',
      materialName: 'RO Filtration & Purification Cartridges',
      supplierName: 'PureFlow Water Systems',
      grnOrLotRef: 'GRN-2026-104',
      parameterMeasured: 'TDS / Micron Integrity',
      specTarget: '< 15 ppm / 5 micron',
      status: 'Approved',
      checkedDate: '2026-11-20',
      inspector: 'K. Mahlangu',
    },
    {
      id: 'RMC-2',
      checkCode: 'QCR-2026-029',
      materialName: 'Food-Grade 2kg Ice Poly Bag Roll',
      supplierName: 'Apex FlexiPack',
      grnOrLotRef: 'GRN-2026-106',
      parameterMeasured: 'Film Gauge & Food Certificate',
      specTarget: '55 um / COA Attached',
      status: 'On Hold',
      checkedDate: '2026-11-19',
      inspector: 'N. Khumalo',
    },
    {
      id: 'RMC-3',
      checkCode: 'QCR-2026-030',
      materialName: 'Sanitizer & Descaling Concentrate',
      supplierName: 'HydroChem Industrial',
      grnOrLotRef: 'GRN-2026-108',
      parameterMeasured: 'Seal & Label Legibility',
      specTarget: 'Intact / Batch & Hazard Tag',
      status: 'Rejected',
      checkedDate: '2026-11-18',
      inspector: 'P. Sithole',
    },
  ]);

  filteredChecks = computed(() => {
    const status = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.checks().filter((c) => {
      const matchesStatus = status === 'All' || c.status === status;
      const matchesQuery =
        !q ||
        c.checkCode.toLowerCase().includes(q) ||
        c.materialName.toLowerCase().includes(q) ||
        c.supplierName.toLowerCase().includes(q) ||
        c.grnOrLotRef.toLowerCase().includes(q) ||
        c.inspector.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  });

  addCheck(payload: Omit<RawMaterialCheckRecord, 'id'>): void {
    this.checks.update((list) => [{ id: `RMC-${Date.now()}`, ...payload }, ...list]);
    this.showNewModal.set(false);
  }

  updateCheck(updated: RawMaterialCheckRecord): void {
    this.checks.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingCheck.set(null);
  }

  deleteCheck(id: string): void {
    this.checks.update((list) => list.filter((item) => item.id !== id));
    this.deletingCheck.set(null);
  }
}