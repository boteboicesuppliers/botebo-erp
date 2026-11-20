import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAndMaterialsPrimary } from './products-and-materials-primary';

describe('ProductsAndMaterialsPrimary', () => {
  let component: ProductsAndMaterialsPrimary;
  let fixture: ComponentFixture<ProductsAndMaterialsPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAndMaterialsPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAndMaterialsPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
