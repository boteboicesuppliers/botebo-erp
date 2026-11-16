import { Component, effect, input, output, signal } from '@angular/core';
import { OpportunityRecord, PipelineStage } from '../pipeline-board-widget/pipeline-board-widget';

@Component({
  selector: 'app-edit-opportunity-form',
  imports: [],
  templateUrl: './edit-opportunity-form.html',
  styleUrl: './edit-opportunity-form.css',
})
export class EditOpportunityForm {
  opportunity = input.required<OpportunityRecord>();
  close = output<void>();
  save = output<OpportunityRecord>();

  client = signal('');
  tier = signal('');
  stage = signal<PipelineStage>('Lead / Qualification');
  probability = signal(10);
  value = signal(0);
  margin = signal(20);
  owner = signal('');
  followUpDate = signal('');

  constructor() {
    effect(() => {
      const opp = this.opportunity();
      this.client.set(opp.client);
      this.tier.set(opp.tier);
      this.stage.set(opp.stage);
      this.probability.set(opp.probability);
      this.value.set(opp.value);
      this.margin.set(opp.margin);
      this.owner.set(opp.owner);
      this.followUpDate.set(opp.followUpDate);
    });
  }

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

  submitEdit() {
    const current = this.opportunity();
    this.save.emit({
      ...current,
      client: this.client().trim() || current.client,
      tier: this.tier(),
      stage: this.stage(),
      probability: this.probability(),
      value: Number(this.value()),
      margin: Number(this.margin()),
      owner: this.owner(),
      followUpDate: this.followUpDate(),
    });
  }
}