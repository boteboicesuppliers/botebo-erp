import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForQuote } from './requests-for-quote';

describe('RequestsForQuote', () => {
  let component: RequestsForQuote;
  let fixture: ComponentFixture<RequestsForQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsForQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsForQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
