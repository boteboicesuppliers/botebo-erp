import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAndMaterialsPrimaryWidget } from './products-and-materials-primary-widget';

describe('ProductsAndMaterialsPrimaryWidget', () => {
  let component: ProductsAndMaterialsPrimaryWidget;
  let fixture: ComponentFixture<ProductsAndMaterialsPrimaryWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAndMaterialsPrimaryWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAndMaterialsPrimaryWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
