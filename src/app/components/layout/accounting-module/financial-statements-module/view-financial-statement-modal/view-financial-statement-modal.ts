import { Component, input, output } from '@angular/core';
import {
  CompiledFinancialStatement,
  ExportFormat,
} from '../financial-statements-list-widget/financial-statements-list-widget';

@Component({
  selector: 'app-view-financial-statement-modal',
  imports: [],
  templateUrl: './view-financial-statement-modal.html',
  styleUrl: './view-financial-statement-modal.css',
})
export class ViewFinancialStatementModal {
  statement = input.required<CompiledFinancialStatement>();
  close = output<void>();
  exportRequested = output<{ statement: CompiledFinancialStatement; format: ExportFormat }>();

  formatZar(amount: number): string {
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    return `${sign}R ${abs.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}