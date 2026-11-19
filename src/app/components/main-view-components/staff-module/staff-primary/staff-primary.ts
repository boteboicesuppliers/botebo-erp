import { Component } from '@angular/core';
import { StaffMembersListWidget } from '../../../layout/staff-module/staff-primary/staff-members-list-widget/staff-members-list-widget';

@Component({
  selector: 'app-staff-primary',
  imports: [StaffMembersListWidget],
  templateUrl: './staff-primary.html',
  styleUrl: './staff-primary.css',
})
export class StaffPrimary {}