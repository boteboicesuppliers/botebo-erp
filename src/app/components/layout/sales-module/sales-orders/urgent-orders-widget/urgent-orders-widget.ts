import { Component } from '@angular/core';

@Component({
  selector: 'app-urgent-orders-widget',
  imports: [],
  templateUrl: './urgent-orders-widget.html',
  styleUrl: './urgent-orders-widget.css',
})
export class UrgentOrdersWidget {
  urgentOrders = [
    {
      id: 'SO-2026-0912',
      customerCode: 'C-RES-0014',
      client: 'Botebo Ice Distributors',
      destination: 'Johannesburg Central Cold Store',
      requiredDate: 'Today, 14:00',
      value: 145200,
      status: 'Expedited Pick & Pack',
    },
    {
      id: 'SO-2026-0915',
      customerCode: 'C-RET-0029',
      client: 'Gauteng Forecourt Holdings',
      destination: 'Midrand Express Forecourt #4',
      requiredDate: 'Today, 16:30',
      value: 89000,
      status: 'Awaiting Fleet Loading',
    },
    {
      id: 'SO-2026-0918',
      customerCode: 'C-FB-0008',
      client: 'Pretoria Hospitality Group',
      destination: 'Menlyn Central Warehouse',
      requiredDate: 'Tomorrow, 08:00',
      value: 230400,
      status: 'QA Temp Verification',
    },
  ];

  zar = (n: number) => 'R ' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}