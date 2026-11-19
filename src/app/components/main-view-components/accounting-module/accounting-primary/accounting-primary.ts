import { Component } from '@angular/core';
import { AccountingPrimary as AccountingPrimaryLayout } from '../../../layout/accounting-module/accounting-primary-module/accounting-primary/accounting-primary';

@Component({
  selector: 'app-accounting-primary-view',
  imports: [AccountingPrimaryLayout],
  templateUrl: './accounting-primary.html',
  styleUrl: './accounting-primary.css',
})
export class AccountingPrimary {}