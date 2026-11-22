import { Component } from '@angular/core';
import { DailyOperations as DailyOperationsLayout } from '../../../layout/overview-and-analytics-module/daily-operations/daily-operations';

@Component({
  selector: 'app-daily-operations',
  imports: [DailyOperationsLayout],
  templateUrl: './daily-operations.html',
  styleUrl: './daily-operations.css',
})
export class DailyOperations {}