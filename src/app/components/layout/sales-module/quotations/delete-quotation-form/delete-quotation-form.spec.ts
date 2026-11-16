import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuotationForm } from './delete-quotation-form';

describe('DeleteQuotationForm', () => {
  let component: DeleteQuotationForm;
  let fixture: ComponentFixture<DeleteQuotationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteQuotationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuotationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
