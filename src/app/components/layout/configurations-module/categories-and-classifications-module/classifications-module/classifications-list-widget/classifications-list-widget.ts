import { Component, computed, signal } from '@angular/core';
import { NewClassificationForm } from '../new-classification-form/new-classification-form';
import { EditClassificationForm } from '../edit-classification-form/edit-classification-form';
import { DeleteClassificationForm } from '../delete-classification-form/delete-classification-form';

export interface BusinessClassificationRecord {
  id: string;
  code: string;
  name: string;
  classificationType: 'Business Unit' | 'Production Department';
  productionDepartment: string;
  businessUnit: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-classifications-list-widget',
  imports: [NewClassificationForm, EditClassificationForm, DeleteClassificationForm],
  templateUrl: './classifications-list-widget.html',
  styleUrl: './classifications-list-widget.css',
})
export class ClassificationsListWidget {
  searchQuery = signal('');
  typeFilter = signal<'All' | 'Business Unit' | 'Production Department'>('All');
  showNewModal = signal(false);
  editingClassification = signal<BusinessClassificationRecord | null>(null);
  deletingClassification = signal<BusinessClassificationRecord | null>(null);

  classifications = signal<BusinessClassificationRecord[]>([
    {
      id: 'CLS-1',
      code: 'BU-ICE',
      name: 'Botebo Ice Suppliers',
      classificationType: 'Business Unit',
      productionDepartment: 'All Production Lines',
      businessUnit: 'Botebo Ice Suppliers',
      status: 'Active',
    },
    {
      id: 'CLS-2',
      code: 'BU-ENT',
      name: 'Botebo Entertainment',
      classificationType: 'Business Unit',
      productionDepartment: 'Events & Bulk Supply',
      businessUnit: 'Botebo Entertainment',
      status: 'Active',
    },
    {
      id: 'CLS-3',
      code: 'DEPT-CHILL-01',
      name: 'Ice Freezing & Chiller Plant',
      classificationType: 'Production Department',
      productionDepartment: 'Ice Freezing & Chiller Plant',
      businessUnit: 'Botebo Ice Suppliers',
      status: 'Active',
    },
    {
      id: 'CLS-4',
      code: 'DEPT-PACK-02',
      name: 'Bagging, Palletizing & Cold Storage',
      classificationType: 'Production Department',
      productionDepartment: 'Bagging, Palletizing & Cold Storage',
      businessUnit: 'Botebo Ice Suppliers',
      status: 'Active',
    },
  ]);

  filteredClassifications = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const tf = this.typeFilter();

    return this.classifications().filter((c) => {
      const matchesType = tf === 'All' || c.classificationType === tf;
      const matchesQuery =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.businessUnit.toLowerCase().includes(q) ||
        c.productionDepartment.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  });

  addClassification(newItem: Omit<BusinessClassificationRecord, 'id'>) {
    const created: BusinessClassificationRecord = {
      ...newItem,
      id: `CLS-${Date.now().toString().slice(-4)}`,
    };
    this.classifications.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateClassification(updated: BusinessClassificationRecord) {
    this.classifications.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingClassification.set(null);
  }

  deleteClassification(id: string) {
    this.classifications.update((list) => list.filter((item) => item.id !== id));
    this.deletingClassification.set(null);
  }
}