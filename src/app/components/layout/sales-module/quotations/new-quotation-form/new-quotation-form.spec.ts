import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotationForm } from './new-quotation-form';

describe('NewQuotationForm', () => {
  let component: NewQuotationForm;
  let fixture: ComponentFixture<NewQuotationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewQuotationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuotationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
