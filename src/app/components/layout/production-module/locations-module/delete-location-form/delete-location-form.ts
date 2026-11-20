import { Component, input, output } from '@angular/core';
import { LocationRecord } from '../locations-list-widget/locations-list-widget';

@Component({
  selector: 'app-delete-location-form',
  imports: [],
  templateUrl: './delete-location-form.html',
  styleUrl: './delete-location-form.css',
})
export class DeleteLocationForm {
  location = input.required<LocationRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}