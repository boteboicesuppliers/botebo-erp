import { Component } from '@angular/core';
import { FinancialAnalysisOverview } from '../../../layout/accounting-module/financial-projections-module/financial-analysis-overview/financial-analysis-overview';

@Component({
  selector: 'app-financial-projections',
  imports: [FinancialAnalysisOverview],
  templateUrl: './financial-projections.html',
  styleUrl: './financial-projections.css',
})
export class FinancialProjections {}