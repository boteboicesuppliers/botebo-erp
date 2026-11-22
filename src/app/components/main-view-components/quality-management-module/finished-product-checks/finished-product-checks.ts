import { Component } from '@angular/core';
import { FinishedProductChecksListWidget } from '../../../layout/quality-management-module/finished-product-checks-module/finished-product-checks-list-widget/finished-product-checks-list-widget';

@Component({
  selector: 'app-finished-product-checks',
  imports: [FinishedProductChecksListWidget],
  templateUrl: './finished-product-checks.html',
  styleUrl: './finished-product-checks.css',
})
export class FinishedProductChecks {}