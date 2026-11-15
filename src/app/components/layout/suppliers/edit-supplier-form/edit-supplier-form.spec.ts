import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplierForm } from './edit-supplier-form';

describe('EditSupplierForm', () => {
  let component: EditSupplierForm;
  let fixture: ComponentFixture<EditSupplierForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupplierForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSupplierForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
