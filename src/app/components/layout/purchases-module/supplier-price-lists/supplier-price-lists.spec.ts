import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPriceLists } from './supplier-price-lists';

describe('SupplierPriceLists', () => {
  let component: SupplierPriceLists;
  let fixture: ComponentFixture<SupplierPriceLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPriceLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPriceLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
