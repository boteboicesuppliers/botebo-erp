import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAgnostics } from './product-agnostics';

describe('ProductAgnostics', () => {
  let component: ProductAgnostics;
  let fixture: ComponentFixture<ProductAgnostics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAgnostics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAgnostics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
