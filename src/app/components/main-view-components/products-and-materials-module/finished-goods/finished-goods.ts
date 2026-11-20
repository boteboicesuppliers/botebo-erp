import { Component } from '@angular/core';
import { FinishedGoodsListWidget } from '../../../layout/products-and-materials-module/finished-goods-module/finished-goods-list-widget/finished-goods-list-widget';

@Component({
  selector: 'app-finished-goods',
  imports: [FinishedGoodsListWidget],
  templateUrl: './finished-goods.html',
  styleUrl: './finished-goods.css',
})
export class FinishedGoods {}