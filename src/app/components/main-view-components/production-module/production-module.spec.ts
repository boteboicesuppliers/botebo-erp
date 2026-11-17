import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionModule } from './production-module';

describe('ProductionModule', () => {
  let component: ProductionModule;
  let fixture: ComponentFixture<ProductionModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
