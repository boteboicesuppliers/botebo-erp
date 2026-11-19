import { Component, computed, signal } from '@angular/core';
import { NewWorkflowForm } from '../new-workflow-form/new-workflow-form';
import { EditWorkflowForm } from '../edit-workflow-form/edit-workflow-form';
import { DeleteWorkflowForm } from '../delete-workflow-form/delete-workflow-form';

export type WorkflowModuleScope =
  | 'Purchases'
  | 'Sales'
  | 'Inventory'
  | 'Production'
  | 'Accounting';

export type WorkflowType =
  | 'Threshold Approval'
  | 'Automated Action'
  | 'State Transition';

export interface WorkflowRecord {
  id: string;
  code: string;
  name: string;
  moduleScope: WorkflowModuleScope;
  workflowType: WorkflowType;
  triggerEvent: string;
  conditionRule: string;
  approverRole: string;
  automatedAction: string;
  slaHours: number;
  active: boolean;
}

@Component({
  selector: 'app-workflows-list-widget',
  imports: [NewWorkflowForm, EditWorkflowForm, DeleteWorkflowForm],
  templateUrl: './workflows-list-widget.html',
  styleUrl: './workflows-list-widget.css',
})
export class WorkflowsListWidget {
  moduleFilter = signal<'All' | WorkflowModuleScope>('All');
  statusFilter = signal<'All' | 'Active' | 'Inactive'>('All');
  searchQuery = signal('');
  showNewModal = signal(false);
  editingWorkflow = signal<WorkflowRecord | null>(null);
  deletingWorkflow = signal<WorkflowRecord | null>(null);

  workflows = signal<WorkflowRecord[]>([
    {
      id: 'WF-1',
      code: 'WF-PUR-01',
      name: 'Purchase Request Threshold Approval',
      moduleScope: 'Purchases',
      workflowType: 'Threshold Approval',
      triggerEvent: 'Purchase Request submitted',
      conditionRule: 'Total greater than R 15,000',
      approverRole: 'Operations Manager',
      automatedAction: 'Hold PO issue until approved',
      slaHours: 24,
      active: true,
    },
    {
      id: 'WF-2',
      code: 'WF-SAL-01',
      name: 'Quotation Discount Sign-Off',
      moduleScope: 'Sales',
      workflowType: 'Threshold Approval',
      triggerEvent: 'Quotation created or updated',
      conditionRule: 'Discount greater than 10%',
      approverRole: 'Sales & Finance Lead',
      automatedAction: 'Block Sales Order conversion until signed off',
      slaHours: 12,
      active: true,
    },
    {
      id: 'WF-3',
      code: 'WF-INV-01',
      name: 'Cold-Room Stock Variance Review',
      moduleScope: 'Inventory',
      workflowType: 'State Transition',
      triggerEvent: 'Stock Adjustment submitted',
      conditionRule: 'Variance greater than 50 units',
      approverRole: 'Cold Chain Supervisor',
      automatedAction: 'Move to Pending Review before ledger posting',
      slaHours: 8,
      active: true,
    },
    {
      id: 'WF-4',
      code: 'WF-PRD-01',
      name: 'Confirmed Sales Order Batch Queue',
      moduleScope: 'Production',
      workflowType: 'Automated Action',
      triggerEvent: 'Sales Order confirmed',
      conditionRule: 'Item in Bagged Ice category',
      approverRole: 'Production Planner',
      automatedAction: 'Create draft production batch & reserve stock',
      slaHours: 6,
      active: true,
    },
    {
      id: 'WF-5',
      code: 'WF-ACC-01',
      name: 'High-Value Journal Entry Review',
      moduleScope: 'Accounting',
      workflowType: 'Threshold Approval',
      triggerEvent: 'Manual Journal Entry created',
      conditionRule: 'Amount greater than R 50,000',
      approverRole: 'Financial Controller',
      automatedAction: 'Require secondary review before GL posting',
      slaHours: 24,
      active: false,
    },
  ]);

  filteredWorkflows = computed(() => {
    const mod = this.moduleFilter();
    const st = this.statusFilter();
    const q = this.searchQuery().toLowerCase().trim();

    return this.workflows().filter((wf) => {
      const matchesModule = mod === 'All' || wf.moduleScope === mod;
      const matchesStatus =
        st === 'All' || (st === 'Active' ? wf.active : !wf.active);
      const matchesQuery =
        !q ||
        wf.code.toLowerCase().includes(q) ||
        wf.name.toLowerCase().includes(q) ||
        wf.triggerEvent.toLowerCase().includes(q) ||
        wf.conditionRule.toLowerCase().includes(q) ||
        wf.approverRole.toLowerCase().includes(q);
      return matchesModule && matchesStatus && matchesQuery;
    });
  });

  toggleActive(id: string) {
    this.workflows.update((list) =>
      list.map((wf) => (wf.id === id ? { ...wf, active: !wf.active } : wf))
    );
  }

  addWorkflow(newItem: Omit<WorkflowRecord, 'id'>) {
    const created: WorkflowRecord = {
      ...newItem,
      id: `WF-${Date.now().toString().slice(-4)}`,
    };
    this.workflows.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  updateWorkflow(updated: WorkflowRecord) {
    this.workflows.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingWorkflow.set(null);
  }

  deleteWorkflow(id: string) {
    this.workflows.update((list) => list.filter((item) => item.id !== id));
    this.deletingWorkflow.set(null);
  }
}