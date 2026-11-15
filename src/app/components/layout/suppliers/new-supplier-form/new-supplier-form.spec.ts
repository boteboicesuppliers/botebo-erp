import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplierForm } from './new-supplier-form';

describe('NewSupplierForm', () => {
  let component: NewSupplierForm;
  let fixture: ComponentFixture<NewSupplierForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSupplierForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSupplierForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
