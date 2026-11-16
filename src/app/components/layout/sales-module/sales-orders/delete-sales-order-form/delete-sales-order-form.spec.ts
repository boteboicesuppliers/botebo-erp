import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalesOrderForm } from './delete-sales-order-form';

describe('DeleteSalesOrderForm', () => {
  let component: DeleteSalesOrderForm;
  let fixture: ComponentFixture<DeleteSalesOrderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSalesOrderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSalesOrderForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
