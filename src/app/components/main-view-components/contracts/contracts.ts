import { Component } from '@angular/core';
import { CustomerListWidget } from '../../layout/contracts/customer-list-widget/customer-list-widget';

@Component({
  selector: 'app-contracts',
  imports: [CustomerListWidget],
  templateUrl: './contracts.html',
})
export class Contracts {}