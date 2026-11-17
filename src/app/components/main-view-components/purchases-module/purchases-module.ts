import { Component } from '@angular/core';
import { PurchaseRequests } from '../../layout/purchases-module/purchase-requests/purchase-requests';
import { RequestsForQuote } from '../../layout/purchases-module/requests-for-quote/requests-for-quote';
import { ReceivedStockGrn } from '../../layout/purchases-module/received-stock-grn/received-stock-grn';
import { SupplierPriceLists } from '../../layout/purchases-module/supplier-price-lists/supplier-price-lists';

@Component({
  selector: 'app-purchases-module',
  imports: [
    PurchaseRequests,
    RequestsForQuote,
    ReceivedStockGrn,
    SupplierPriceLists,
  ],
  templateUrl: './purchases-module.html',
  styleUrl: './purchases-module.css',
})
export class PurchasesModule {
  // Main container shell combining all purchases sub-components
}