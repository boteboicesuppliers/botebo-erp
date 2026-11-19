import { Component } from '@angular/core';
import { FinancialStatementsListWidget } from '../../../layout/accounting-module/financial-statements-module/financial-statements-list-widget/financial-statements-list-widget';

@Component({
  selector: 'app-financial-statements',
  imports: [FinancialStatementsListWidget],
  templateUrl: './financial-statements.html',
  styleUrl: './financial-statements.css',
})
export class FinancialStatements {}