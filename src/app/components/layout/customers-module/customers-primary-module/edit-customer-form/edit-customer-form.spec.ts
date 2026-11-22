import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerForm } from './edit-customer-form';

describe('EditCustomerForm', () => {
  let component: EditCustomerForm;
  let fixture: ComponentFixture<EditCustomerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCustomerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
