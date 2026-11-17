import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionSchedule } from './production-schedule';

describe('ProductionSchedule', () => {
  let component: ProductionSchedule;
  let fixture: ComponentFixture<ProductionSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
