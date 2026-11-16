import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesOrderForm } from './edit-sales-order-form';

describe('EditSalesOrderForm', () => {
  let component: EditSalesOrderForm;
  let fixture: ComponentFixture<EditSalesOrderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSalesOrderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSalesOrderForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
