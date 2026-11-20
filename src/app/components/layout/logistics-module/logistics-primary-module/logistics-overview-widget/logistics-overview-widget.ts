import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface LogisticsOverviewMetrics {
  scheduledDeliveries: number;
  activeTrips: number;
  pendingDispatch: number;
  completedToday: number;
  totalBagsOut: number;
}

@Component({
  selector: 'app-logistics-overview-widget',
  imports: [RouterLink],
  templateUrl: './logistics-overview-widget.html',
  styleUrl: './logistics-overview-widget.css',
})
export class LogisticsOverviewWidget {
  metrics = signal<LogisticsOverviewMetrics>({
    scheduledDeliveries: 27,
    activeTrips: 3,
    pendingDispatch: 6,
    completedToday: 18,
    totalBagsOut: 1950,
  });

  completionRate = computed(() => {
    const m = this.metrics();
    if (!m.scheduledDeliveries) return 0;
    return Math.round((m.completedToday / m.scheduledDeliveries) * 100);
  });
}