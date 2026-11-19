import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestForQuoteForm } from './edit-request-for-quote-form';

describe('EditRequestForQuoteForm', () => {
  let component: EditRequestForQuoteForm;
  let fixture: ComponentFixture<EditRequestForQuoteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRequestForQuoteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequestForQuoteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
