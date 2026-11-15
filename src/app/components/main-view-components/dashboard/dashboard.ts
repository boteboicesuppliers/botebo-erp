import { Component } from '@angular/core';
import { OverviewWidgets } from '../../layout/dashboard/overview-widgets/overview-widgets';

@Component({
  selector: 'app-dashboard',
  imports: [OverviewWidgets],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}