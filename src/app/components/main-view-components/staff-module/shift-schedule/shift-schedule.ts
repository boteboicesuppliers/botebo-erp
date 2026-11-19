import { Component } from '@angular/core';
import { ShiftsListWidget } from '../../../layout/staff-module/shift-schedule/shifts-list-widget/shifts-list-widget';

@Component({
  selector: 'app-shift-schedule',
  imports: [ShiftsListWidget],
  templateUrl: './shift-schedule.html',
  styleUrl: './shift-schedule.css',
})
export class ShiftSchedule {}