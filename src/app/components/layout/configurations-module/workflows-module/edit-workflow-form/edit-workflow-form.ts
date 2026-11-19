import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  WorkflowModuleScope,
  WorkflowRecord,
  WorkflowType,
} from '../workflows-list-widget/workflows-list-widget';

@Component({
  selector: 'app-edit-workflow-form',
  imports: [FormsModule],
  templateUrl: './edit-workflow-form.html',
  styleUrl: './edit-workflow-form.css',
})
export class EditWorkflowForm {
  workflow = input.required<WorkflowRecord>();
  close = output<void>();
  save = output<WorkflowRecord>();

  code = signal('');
  name = signal('');
  moduleScope = signal<WorkflowModuleScope>('Purchases');
  workflowType = signal<WorkflowType>('Threshold Approval');
  triggerEvent = signal('');
  conditionRule = signal('');
  approverRole = signal('');
  automatedAction = signal('');
  slaHours = signal<number>(24);
  active = signal<boolean>(true);
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const wf = this.workflow();
      this.code.set(wf.code);
      this.name.set(wf.name);
      this.moduleScope.set(wf.moduleScope);
      this.workflowType.set(wf.workflowType);
      this.triggerEvent.set(wf.triggerEvent);
      this.conditionRule.set(wf.conditionRule);
      this.approverRole.set(wf.approverRole);
      this.automatedAction.set(wf.automatedAction);
      this.slaHours.set(wf.slaHours);
      this.active.set(wf.active);
    });
  }

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();
    const cleanTrigger = this.triggerEvent().trim();
    const cleanCondition = this.conditionRule().trim();

    if (!cleanCode || !cleanName || !cleanTrigger || !cleanCondition) {
      this.errorMessage.set('Code, Name, Trigger, and Condition are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.workflow().id,
      code: cleanCode,
      name: cleanName,
      moduleScope: this.moduleScope(),
      workflowType: this.workflowType(),
      triggerEvent: cleanTrigger,
      conditionRule: cleanCondition,
      approverRole: this.approverRole().trim() || 'Operations Manager',
      automatedAction: this.automatedAction().trim() || 'Require approval sign-off',
      slaHours: Math.max(1, Number(this.slaHours()) || 24),
      active: this.active(),
    });
  }
}