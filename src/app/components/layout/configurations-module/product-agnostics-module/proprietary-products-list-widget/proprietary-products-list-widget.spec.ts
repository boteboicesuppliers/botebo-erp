import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaryProductsListWidget } from './proprietary-products-list-widget';

describe('ProprietaryProductsListWidget', () => {
  let component: ProprietaryProductsListWidget;
  let fixture: ComponentFixture<ProprietaryProductsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietaryProductsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProprietaryProductsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
