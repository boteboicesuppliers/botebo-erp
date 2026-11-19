import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface AccountingGroupLink {
  title: string;
  code: string;
  description: string;
  route: string;
  badge: string;
}

@Component({
  selector: 'app-accounting-primary',
  imports: [RouterLink],
  templateUrl: './accounting-primary.html',
  styleUrl: './accounting-primary.css',
})
export class AccountingPrimary {
  groupLinks = signal<AccountingGroupLink[]>([
    {
      title: 'Bookkeeping',
      code: 'ACC-BK',
      description: 'Subsidiary journals (CRJ, CPJ, PJ, SJ, GJ), General Ledger statements, T-accounts, and journal CRUD.',
      route: '/accounting/bookkeeping',
      badge: 'Journals & GL',
    },
    {
      title: 'Financial Statements',
      code: 'ACC-FS',
      description: 'Statement of Financial Position, Financial Performance, Cash Flows, and Changes in Equity with view & export.',
      route: '/accounting/financial-statements',
      badge: 'IFRS Statements',
    },
    {
      title: 'Financial Projections',
      code: 'ACC-FP',
      description: 'Historical performance vs. forward projections with trend, bar, and margin graphs.',
      route: '/accounting/financial-projections',
      badge: 'Analysis & Graphs',
    },
  ]);
}