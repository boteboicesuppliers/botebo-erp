import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  WorkflowModuleScope,
  WorkflowRecord,
  WorkflowType,
} from '../workflows-list-widget/workflows-list-widget';

@Component({
  selector: 'app-new-workflow-form',
  imports: [FormsModule],
  templateUrl: './new-workflow-form.html',
  styleUrl: './new-workflow-form.css',
})
export class NewWorkflowForm {
  close = output<void>();
  save = output<Omit<WorkflowRecord, 'id'>>();

  code = signal('');
  name = signal('');
  moduleScope = signal<WorkflowModuleScope>('Purchases');
  workflowType = signal<WorkflowType>('Threshold Approval');
  triggerEvent = signal('');
  conditionRule = signal('');
  approverRole = signal('Operations Manager');
  automatedAction = signal('Route to approval queue');
  slaHours = signal<number>(24);
  active = signal<boolean>(true);
  errorMessage = signal('');

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