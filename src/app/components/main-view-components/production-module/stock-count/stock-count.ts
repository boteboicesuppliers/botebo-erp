import { Component } from '@angular/core';
import { CurrentStockCountWidget } from '../../../layout/production-module/stock-count-module/current-stock-count-widget/current-stock-count-widget';

@Component({
  selector: 'app-stock-count',
  imports: [CurrentStockCountWidget],
  templateUrl: './stock-count.html',
  styleUrl: './stock-count.css',
})
export class StockCount {}