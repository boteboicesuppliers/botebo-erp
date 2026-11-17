import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiceForm } from './new-invoice-form';

describe('NewInvoiceForm', () => {
  let component: NewInvoiceForm;
  let fixture: ComponentFixture<NewInvoiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInvoiceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInvoiceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
