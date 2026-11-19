import { Component } from '@angular/core';
import { ProprietaryProductsListWidget } from '../../../layout/configurations-module/product-agnostics-module/proprietary-products-list-widget/proprietary-products-list-widget';

@Component({
  selector: 'app-product-agnostics',
  imports: [ProprietaryProductsListWidget],
  templateUrl: './product-agnostics.html',
  styleUrl: './product-agnostics.css',
})
export class ProductAgnostics {}