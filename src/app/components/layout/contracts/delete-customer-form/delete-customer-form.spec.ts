import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerForm } from './delete-customer-form';

describe('DeleteCustomerForm', () => {
  let component: DeleteCustomerForm;
  let fixture: ComponentFixture<DeleteCustomerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCustomerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCustomerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
