import { Component } from '@angular/core';
import { DamagedAndRejectedStockListWidget } from '../../../layout/quality-management-module/damaged-and-rejected-stock-module/damaged-and-rejected-stock-list-widget/damaged-and-rejected-stock-list-widget';

@Component({
  selector: 'app-damaged-and-rejected-stock',
  imports: [DamagedAndRejectedStockListWidget],
  templateUrl: './damaged-and-rejected-stock.html',
  styleUrl: './damaged-and-rejected-stock.css',
})
export class DamagedAndRejectedStock {}