import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductForm } from './edit-product-form';

describe('EditProductForm', () => {
  let component: EditProductForm;
  let fixture: ComponentFixture<EditProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
