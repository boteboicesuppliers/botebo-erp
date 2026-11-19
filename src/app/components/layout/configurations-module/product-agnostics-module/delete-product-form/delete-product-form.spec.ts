import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductForm } from './delete-product-form';

describe('DeleteProductForm', () => {
  let component: DeleteProductForm;
  let fixture: ComponentFixture<DeleteProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
