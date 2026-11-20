import { Component } from '@angular/core';
import { LogisticsOverviewWidget } from '../../../layout/logistics-module/logistics-primary-module/logistics-overview-widget/logistics-overview-widget';
import { RouteZonesWidget } from '../../../layout/logistics-module/logistics-primary-module/route-zones-widget/route-zones-widget';
import { DispatchQueueWidget } from '../../../layout/logistics-module/logistics-primary-module/dispatch-queue-widget/dispatch-queue-widget';

@Component({
  selector: 'app-logistics-primary',
  imports: [LogisticsOverviewWidget, RouteZonesWidget, DispatchQueueWidget],
  templateUrl: './logistics-primary.html',
  styleUrl: './logistics-primary.css',
})
export class LogisticsPrimary {}