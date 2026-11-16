import { Component, output, signal } from '@angular/core';
import { OpportunityRecord, PipelineStage } from '../pipeline-board-widget/pipeline-board-widget';

@Component({
  selector: 'app-new-opportunity-form',
  imports: [],
  templateUrl: './new-opportunity-form.html',
  styleUrl: './new-opportunity-form.css',
})
export class NewOpportunityForm {
  close = output<void>();
  save = output<Omit<OpportunityRecord, 'id' | 'isOverdue' | 'daysInStage'>>();

  customerCode = signal('C-RES-0045');
  client = signal('');
  tier = signal('Tier 1 · Bulk Wholesale');
  stage = signal<PipelineStage>('Lead / Qualification');
  probability = signal(10);
  value = signal<number | null>(null);
  margin = signal<number | null>(22.0);
  owner = signal('T. Mokoena');
  followUpDate = signal('2026-11-24');
  submitted = signal(false);

  onStageChange(newStage: string) {
    const typed = newStage as PipelineStage;
    this.stage.set(typed);
    const probMap: Record<PipelineStage, number> = {
      'Lead / Qualification': 10,
      'Volume Assessment': 25,
      'Quotation Sent': 50,
      'Negotiation': 75,
      'Closed Won': 100,
    };
    this.probability.set(probMap[typed]);
  }

  submitForm() {
    this.submitted.set(true);
    if (!this.client().trim() || !this.value() || this.value()! <= 0) {
      return;
    }

    this.save.emit({
      customerCode: this.customerCode().trim() || 'C-RES-0000',
      client: this.client().trim(),
      tier: this.tier(),
      stage: this.stage(),
      probability: this.probability(),
      value: Number(this.value()),
      margin: Number(this.margin() ?? 20),
      owner: this.owner(),
      followUpDate: this.followUpDate(),
    });
  }
}