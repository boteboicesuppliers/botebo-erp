import { Component } from '@angular/core';
import { CreditLimitsAndBalances as CreditLimitsAndBalancesLayout } from '../../../layout/customers-module/credit-limits-and-balances/credit-limits-and-balances';

@Component({
  selector: 'app-credit-limits-and-balances',
  imports: [CreditLimitsAndBalancesLayout],
  templateUrl: './credit-limits-and-balances.html',
  styleUrl: './credit-limits-and-balances.css',
})
export class CreditLimitsAndBalances {}