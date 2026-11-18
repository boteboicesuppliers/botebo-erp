import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForQuoteRfq } from './request-for-quote-rfq';

describe('RequestForQuoteRfq', () => {
  let component: RequestForQuoteRfq;
  let fixture: ComponentFixture<RequestForQuoteRfq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestForQuoteRfq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestForQuoteRfq);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
