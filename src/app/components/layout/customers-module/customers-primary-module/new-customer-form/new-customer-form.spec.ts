import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerForm } from './new-customer-form';

describe('NewCustomerForm', () => {
  let component: NewCustomerForm;
  let fixture: ComponentFixture<NewCustomerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
