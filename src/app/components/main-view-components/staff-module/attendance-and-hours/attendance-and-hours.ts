import { Component } from '@angular/core';
import { AttendanceListWidget } from '../../../layout/staff-module/attendance-and-hours/attendance-list-widget/attendance-list-widget';

@Component({
  selector: 'app-attendance-and-hours',
  imports: [AttendanceListWidget],
  templateUrl: './attendance-and-hours.html',
  styleUrl: './attendance-and-hours.css',
})
export class AttendanceAndHours {}