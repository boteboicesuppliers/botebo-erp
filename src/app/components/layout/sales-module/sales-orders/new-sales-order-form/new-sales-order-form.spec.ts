import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalesOrderForm } from './new-sales-order-form';

describe('NewSalesOrderForm', () => {
  let component: NewSalesOrderForm;
  let fixture: ComponentFixture<NewSalesOrderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSalesOrderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSalesOrderForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
