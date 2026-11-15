import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSupplierForm } from './delete-supplier-form';

describe('DeleteSupplierForm', () => {
  let component: DeleteSupplierForm;
  let fixture: ComponentFixture<DeleteSupplierForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSupplierForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSupplierForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
