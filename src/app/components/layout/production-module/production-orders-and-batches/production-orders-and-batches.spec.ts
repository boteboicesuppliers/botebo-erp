import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrdersAndBatches } from './production-orders-and-batches';

describe('ProductionOrdersAndBatches', () => {
  let component: ProductionOrdersAndBatches;
  let fixture: ComponentFixture<ProductionOrdersAndBatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionOrdersAndBatches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionOrdersAndBatches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
