import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPriceListWidget } from './supplier-price-list-widget';

describe('SupplierPriceListWidget', () => {
  let component: SupplierPriceListWidget;
  let fixture: ComponentFixture<SupplierPriceListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPriceListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPriceListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
