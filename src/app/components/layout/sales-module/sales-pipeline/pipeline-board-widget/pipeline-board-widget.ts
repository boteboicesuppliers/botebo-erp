import { Component, computed, signal } from '@angular/core';
import { NewOpportunityForm } from '../new-opportunity-form/new-opportunity-form';
import { EditOpportunityForm } from '../edit-opportunity-form/edit-opportunity-form';
import { DeleteOpportunityForm } from '../delete-opportunity-form/delete-opportunity-form';

export type PipelineStage =
  | 'Lead / Qualification'
  | 'Volume Assessment'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Closed Won';

export interface OpportunityRecord {
  id: string;
  customerCode: string;
  client: string;
  tier: string;
  stage: PipelineStage;
  probability: number;
  value: number;
  margin: number;
  owner: string;
  followUpDate: string;
  isOverdue: boolean;
  daysInStage: number;
}

@Component({
  selector: 'app-pipeline-board-widget',
  imports: [NewOpportunityForm, EditOpportunityForm, DeleteOpportunityForm],
  templateUrl: './pipeline-board-widget.html',
  styleUrl: './pipeline-board-widget.css',
})
export class PipelineBoardWidget {
  readonly stages: { name: PipelineStage; prob: number }[] = [
    { name: 'Lead / Qualification', prob: 10 },
    { name: 'Volume Assessment', prob: 25 },
    { name: 'Quotation Sent', prob: 50 },
    { name: 'Negotiation', prob: 75 },
    { name: 'Closed Won', prob: 100 },
  ];

  viewMode = signal<'board' | 'table'>('board');
  searchQuery = signal('');
  selectedTier = signal<string>('All');
  selectedStage = signal<string>('All');
  selectedOppId = signal<string | null>(null);

  // Pagination State for List View
  currentPage = signal(1);
  pageSize = 5;

  // Modal states
  showNewModal = signal(false);
  editingOpp = signal<OpportunityRecord | null>(null);
  deletingOpp = signal<OpportunityRecord | null>(null);

  opportunities = signal<OpportunityRecord[]>([
    {
      id: 'OPP-2026-0411',
      customerCode: 'C-RES-0014',
      client: 'Botebo Ice Distributors',
      tier: 'Tier 1 · Bulk Wholesale',
      stage: 'Negotiation',
      probability: 75,
      value: 420000,
      margin: 22.8,
      owner: 'T. Mokoena',
      followUpDate: '2026-11-18',
      isOverdue: false,
      daysInStage: 3,
    },
    {
      id: 'OPP-2026-0412',
      customerCode: 'C-RET-0029',
      client: 'Gauteng Forecourt Holdings',
      tier: 'Tier 2 · Contract',
      stage: 'Quotation Sent',
      probability: 50,
      value: 285000,
      margin: 17.4,
      owner: 'L. Ndlovu',
      followUpDate: '2026-11-15',
      isOverdue: true,
      daysInStage: 8,
    },
    {
      id: 'OPP-2026-0413',
      customerCode: 'C-FB-0008',
      client: 'Pretoria Hospitality Group',
      tier: 'Tier 3 · Standard',
      stage: 'Volume Assessment',
      probability: 25,
      value: 118000,
      margin: 26.5,
      owner: 'T. Mokoena',
      followUpDate: '2026-11-19',
      isOverdue: false,
      daysInStage: 2,
    },
    {
      id: 'OPP-2026-0414',
      customerCode: 'C-RES-0041',
      client: 'Centurion Cold Chain',
      tier: 'Tier 1 · Bulk Wholesale',
      stage: 'Lead / Qualification',
      probability: 10,
      value: 540000,
      margin: 21.0,
      owner: 'K. Sithole',
      followUpDate: '2026-11-20',
      isOverdue: false,
      daysInStage: 1,
    },
    {
      id: 'OPP-2026-0415',
      customerCode: 'C-RET-0012',
      client: 'Midrand Express Marts',
      tier: 'Tier 2 · Contract',
      stage: 'Closed Won',
      probability: 100,
      value: 312000,
      margin: 24.1,
      owner: 'L. Ndlovu',
      followUpDate: '2026-11-16',
      isOverdue: false,
      daysInStage: 0,
    },
    {
      id: 'OPP-2026-0416',
      customerCode: 'C-FB-0019',
      client: 'Sandton Events & Catering',
      tier: 'Tier 3 · Standard',
      stage: 'Quotation Sent',
      probability: 50,
      value: 94500,
      margin: 27.9,
      owner: 'K. Sithole',
      followUpDate: '2026-11-14',
      isOverdue: true,
      daysInStage: 9,
    },
    {
      id: 'OPP-2026-0417',
      customerCode: 'C-RES-0088',
      client: 'Vaal River Beverages',
      tier: 'Tier 1 · Bulk Wholesale',
      stage: 'Lead / Qualification',
      probability: 10,
      value: 620000,
      margin: 19.5,
      owner: 'T. Mokoena',
      followUpDate: '2026-11-22',
      isOverdue: false,
      daysInStage: 2,
    },
    {
      id: 'OPP-2026-0418',
      customerCode: 'C-RET-0054',
      client: 'Soweto Retail Express',
      tier: 'Tier 2 · Contract',
      stage: 'Volume Assessment',
      probability: 25,
      value: 195000,
      margin: 23.2,
      owner: 'K. Sithole',
      followUpDate: '2026-11-21',
      isOverdue: false,
      daysInStage: 4,
    },
    {
      id: 'OPP-2026-0419',
      customerCode: 'C-FB-0042',
      client: 'Rosebank Culinary Hub',
      tier: 'Tier 3 · Standard',
      stage: 'Quotation Sent',
      probability: 50,
      value: 145000,
      margin: 28.4,
      owner: 'L. Ndlovu',
      followUpDate: '2026-11-18',
      isOverdue: false,
      daysInStage: 3,
    },
    {
      id: 'OPP-2026-0420',
      customerCode: 'C-RES-0091',
      client: 'Limpopo Ice Logistics',
      tier: 'Tier 1 · Bulk Wholesale',
      stage: 'Negotiation',
      probability: 75,
      value: 890000,
      margin: 17.8,
      owner: 'T. Mokoena',
      followUpDate: '2026-11-17',
      isOverdue: true,
      daysInStage: 6,
    },
    {
      id: 'OPP-2026-0421',
      customerCode: 'C-RET-0063',
      client: 'Fourways Superette Group',
      tier: 'Tier 2 · Contract',
      stage: 'Closed Won',
      probability: 100,
      value: 450000,
      margin: 22.0,
      owner: 'L. Ndlovu',
      followUpDate: '2026-11-15',
      isOverdue: false,
      daysInStage: 0,
    },
    {
      id: 'OPP-2026-0422',
      customerCode: 'C-FB-0077',
      client: 'Menlyn Bistro Network',
      tier: 'Tier 3 · Standard',
      stage: 'Lead / Qualification',
      probability: 10,
      value: 88000,
      margin: 31.0,
      owner: 'K. Sithole',
      followUpDate: '2026-11-25',
      isOverdue: false,
      daysInStage: 1,
    },
    {
      id: 'OPP-2026-0423',
      customerCode: 'C-RES-0104',
      client: 'Mpumalanga Cold Storage',
      tier: 'Tier 1 · Bulk Wholesale',
      stage: 'Volume Assessment',
      probability: 25,
      value: 340000,
      margin: 21.4,
      owner: 'T. Mokoena',
      followUpDate: '2026-11-23',
      isOverdue: false,
      daysInStage: 3,
    },
    {
      id: 'OPP-2026-0424',
      customerCode: 'C-RET-0081',
      client: 'Randburg Fuel & Shop',
      tier: 'Tier 2 · Contract',
      stage: 'Negotiation',
      probability: 75,
      value: 210000,
      margin: 23.5,
      owner: 'L. Ndlovu',
      followUpDate: '2026-11-19',
      isOverdue: false,
      daysInStage: 4,
    },
    {
      id: 'OPP-2026-0425',
      customerCode: 'C-FB-0095',
      client: 'Centurion Convention Centre',
      tier: 'Tier 3 · Standard',
      stage: 'Closed Won',
      probability: 100,
      value: 520000,
      margin: 25.0,
      owner: 'K. Sithole',
      followUpDate: '2026-11-14',
      isOverdue: false,
      daysInStage: 0,
    },
  ]);

  filteredOpportunities = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const tier = this.selectedTier();
    const stage = this.selectedStage();

    return this.opportunities().filter((opp) => {
      const matchesSearch =
        opp.id.toLowerCase().includes(q) ||
        opp.client.toLowerCase().includes(q) ||
        opp.customerCode.toLowerCase().includes(q) ||
        opp.owner.toLowerCase().includes(q);
      const matchesTier = tier === 'All' || opp.tier === tier;
      const matchesStage = stage === 'All' || opp.stage === stage;
      return matchesSearch && matchesTier && matchesStage;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredOpportunities().length / this.pageSize)));
  
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  startIndex = computed(() => (this.filteredOpportunities().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredOpportunities().length));

  paginatedOpportunities = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredOpportunities().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  getStageOpps(stageName: PipelineStage): OpportunityRecord[] {
    return this.filteredOpportunities().filter((o) => o.stage === stageName);
  }

  getStageTotal(stageName: PipelineStage): number {
    return this.getStageOpps(stageName).reduce((sum, item) => sum + item.value, 0);
  }

  getStageBadgeClass(stage: PipelineStage): string {
    switch (stage) {
      case 'Closed Won':
        return 'bg-emerald-100 text-emerald-900';
      case 'Negotiation':
        return 'bg-purple-100 text-purple-900';
      case 'Quotation Sent':
        return 'bg-sky-100 text-sky-900';
      case 'Volume Assessment':
        return 'bg-amber-100 text-amber-900';
      case 'Lead / Qualification':
        return 'bg-orange-100 text-orange-900';
    }
  }

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  handleCreateOpportunity(newOpp: Omit<OpportunityRecord, 'id' | 'isOverdue' | 'daysInStage'>) {
    const nextNum = 426 + this.opportunities().length;
    const created: OpportunityRecord = {
      ...newOpp,
      id: `OPP-2026-0${nextNum}`,
      isOverdue: false,
      daysInStage: 0,
    };
    this.opportunities.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateOpportunity(updated: OpportunityRecord) {
    this.opportunities.update((list) =>
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    this.editingOpp.set(null);
  }

  handleDeleteOpportunity(id: string) {
    this.opportunities.update((list) => list.filter((item) => item.id !== id));
    this.deletingOpp.set(null);
  }
}