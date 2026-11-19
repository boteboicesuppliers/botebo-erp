import { Component, input, output } from '@angular/core';
import { WorkflowRecord } from '../workflows-list-widget/workflows-list-widget';

@Component({
  selector: 'app-delete-workflow-form',
  imports: [],
  templateUrl: './delete-workflow-form.html',
  styleUrl: './delete-workflow-form.css',
})
export class DeleteWorkflowForm {
  workflow = input.required<WorkflowRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}