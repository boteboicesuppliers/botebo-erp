import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestForQuoteForm } from './new-request-for-quote-form';

describe('NewRequestForQuoteForm', () => {
  let component: NewRequestForQuoteForm;
  let fixture: ComponentFixture<NewRequestForQuoteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRequestForQuoteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRequestForQuoteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
