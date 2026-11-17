import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceForm } from './edit-invoice-form';

describe('EditInvoiceForm', () => {
  let component: EditInvoiceForm;
  let fixture: ComponentFixture<EditInvoiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInvoiceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInvoiceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
