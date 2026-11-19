import { Component, input, output } from '@angular/core';
import { RfqRecord } from '../quote-request-list-widget/quote-request-list-widget';

@Component({
  selector: 'app-delete-request-for-quote-form',
  imports: [],
  templateUrl: './delete-request-for-quote-form.html',
  styleUrl: './delete-request-for-quote-form.css',
})
export class DeleteRequestForQuoteForm {
  rfq = input.required<RfqRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}