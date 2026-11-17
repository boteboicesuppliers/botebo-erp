import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-requests-for-quote',
  imports: [],
  templateUrl: './requests-for-quote.html',
  styleUrl: './requests-for-quote.css',
})
export class RequestsForQuote {
  rfqs = signal([
    { id: 'RFQ-2026-0041', supplier: 'Gauteng Chemical Supplies', item: 'Ammonia Refrigerant (500kg)', deadline: '2026-11-20', quotesReceived: '2 of 3', status: 'Active' },
    { id: 'RFQ-2026-0042', supplier: 'Mpumalanga Packaging Corp', item: 'LDPE Film Rolls (2,000)', deadline: '2026-11-22', quotesReceived: '3 of 3', status: 'Evaluating' },
  ]);
}