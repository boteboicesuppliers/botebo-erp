import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionReport } from './production-report';

describe('ProductionReport', () => {
  let component: ProductionReport;
  let fixture: ComponentFixture<ProductionReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
