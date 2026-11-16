import { Component, input, output, signal } from '@angular/core';
import { OpportunityRecord } from '../pipeline-board-widget/pipeline-board-widget';

@Component({
  selector: 'app-delete-opportunity-form',
  imports: [],
  templateUrl: './delete-opportunity-form.html',
  styleUrl: './delete-opportunity-form.css',
})
export class DeleteOpportunityForm {
  opportunity = input.required<OpportunityRecord>();
  close = output<void>();
  confirmDelete = output<string>();

  reason = signal('Price / margin floor constraint');
}