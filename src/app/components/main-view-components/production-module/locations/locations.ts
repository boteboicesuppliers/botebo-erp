import { Component } from '@angular/core';
import { LocationsListWidget } from '../../../layout/production-module/locations-module/locations-list-widget/locations-list-widget';

@Component({
  selector: 'app-locations',
  imports: [LocationsListWidget],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations {}