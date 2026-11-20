import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LocationRecord,
  LocationType,
} from '../locations-list-widget/locations-list-widget';

@Component({
  selector: 'app-edit-location-form',
  imports: [FormsModule],
  templateUrl: './edit-location-form.html',
  styleUrl: './edit-location-form.css',
})
export class EditLocationForm {
  location = input.required<LocationRecord>();
  close = output<void>();
  save = output<LocationRecord>();

  code = signal('');
  name = signal('');
  locationType = signal<LocationType>('Cold Room');
  department = signal('');
  temperatureTarget = signal('');
  capacityUnits = signal<number>(1);
  currentStockUnits = signal<number>(0);
  status = signal<'Active' | 'Inactive'>('Active');
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const loc = this.location();
      this.code.set(loc.code);
      this.name.set(loc.name);
      this.locationType.set(loc.locationType);
      this.department.set(loc.department);
      this.temperatureTarget.set(loc.temperatureTarget);
      this.capacityUnits.set(loc.capacityUnits);
      this.currentStockUnits.set(loc.currentStockUnits);
      this.status.set(loc.status);
    });
  }

  submitForm() {
    const cleanCode = this.code().trim().toUpperCase();
    const cleanName = this.name().trim();

    if (!cleanCode || !cleanName) {
      this.errorMessage.set('Location code and name are required.');
      return;
    }

    this.errorMessage.set('');
    this.save.emit({
      id: this.location().id,
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