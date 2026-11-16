import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPrimary } from './SalesPrimary-primary';

describe('SalesPrimary', () => {
  let component: SalesPrimary;
  let fixture: ComponentFixture<SalesPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
