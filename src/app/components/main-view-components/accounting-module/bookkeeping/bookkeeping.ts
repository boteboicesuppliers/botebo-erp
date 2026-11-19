import { Component } from '@angular/core';
import { JournalsListWidget } from '../../../layout/accounting-module/bookkeeping/journals-list-widget/journals-list-widget';
import { LedgersListWidget } from '../../../layout/accounting-module/bookkeeping/ledgers-list-widget/ledgers-list-widget';

@Component({
  selector: 'app-bookkeeping',
  imports: [JournalsListWidget, LedgersListWidget],
  templateUrl: './bookkeeping.html',
  styleUrl: './bookkeeping.css',
})
export class Bookkeeping {}