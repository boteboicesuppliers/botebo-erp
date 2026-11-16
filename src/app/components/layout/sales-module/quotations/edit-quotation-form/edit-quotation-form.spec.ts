import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotationForm } from './edit-quotation-form';

describe('EditQuotationForm', () => {
  let component: EditQuotationForm;
  let fixture: ComponentFixture<EditQuotationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuotationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuotationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
