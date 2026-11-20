import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LocationRecord,
  LocationType,
} from '../locations-list-widget/locations-list-widget';

@Component({
  selector: 'app-new-location-form',
  imports: [FormsModule],
  templateUrl: './new-location-form.html',
  styleUrl: './new-location-form.css',
})
export class NewLocationForm {
  close = output<void>();
  save = output<Omit<LocationRecord, 'id'>>();

  code = signal('');
  name = signal('');
  locationType = signal<LocationType>('Cold Room');
  department = signal('Bagging, Palletizing & Cold Storage');
  temperatureTarget = signal('-18°C to -22°C');
  capacityUnits = signal<number>(2000);
  currentStockUnits = signal<number>(0);
  status = signal<'Active' | 'Inactive'>('Active');
  errorMessage = signal('');

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanCode || !cleanName) {
      this.errorMessage.set('Location code and name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      code: cleanCode,
      name: cleanName,
      locationType: this.locationType(),
      department: this.department().trim() || 'General Production',
      temperatureTarget: this.temperatureTarget().trim() || 'Ambient',
      capacityUnits: Math.max(1, Number(this.capacityUnits()) || 1),
      currentStockUnits: Math.max(0, Number(this.currentStockUnits()) || 0),
      status: this.status(),
    });
  }
}