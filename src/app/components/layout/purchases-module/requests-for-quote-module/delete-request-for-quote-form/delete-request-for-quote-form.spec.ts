import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequestForQuoteForm } from './delete-request-for-quote-form';

describe('DeleteRequestForQuoteForm', () => {
  let component: DeleteRequestForQuoteForm;
  let fixture: ComponentFixture<DeleteRequestForQuoteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRequestForQuoteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRequestForQuoteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
