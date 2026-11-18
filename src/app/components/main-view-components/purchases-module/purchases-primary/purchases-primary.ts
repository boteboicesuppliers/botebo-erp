import { Component } from '@angular/core';
import { PurchasesListWidget } from '../../../layout/purchases-module/purchases-primary-module/purchases-list-widget/purchases-list-widget';

@Component({
  selector: 'app-purchases-primary',
  imports: [PurchasesListWidget],
  templateUrl: './purchases-primary.html',
  styleUrl: './purchases-primary.css',
})
export class PurchasesPrimary {}