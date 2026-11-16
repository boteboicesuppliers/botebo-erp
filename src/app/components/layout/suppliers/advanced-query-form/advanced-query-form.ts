import { Component, input, output } from '@angular/core';
import { QueryGroup, QueryRun } from '../../../../services/suppliers/advanced-query';

@Component({
  selector: 'app-advanced-query-form',
  imports: [],
  templateUrl: './advanced-query-form.html',
  styleUrl: './advanced-query-form.css',
})
export class AdvancedQueryForm {
  initial = input<QueryGroup | null>(null);
  initialSavedId = input<string | null>(null);
  closed = output<void>();
  run = output<QueryRun>();
  cleared = output<void>();
}