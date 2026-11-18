import { Component } from '@angular/core';
import { PurchaseRequestListWidget } from '../../../layout/purchases-module/purchase-requests-module/purchase-request-list-widget/purchase-request-list-widget';

@Component({
  selector: 'app-purchase-requests',
  imports: [PurchaseRequestListWidget],
  templateUrl: './purchase-requests.html',
  styleUrl: './purchase-requests.css',
})
export class PurchaseRequests {}