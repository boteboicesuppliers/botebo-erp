import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAndOrdersSnapshot } from './sales-and-orders-snapshot';

describe('SalesAndOrdersSnapshot', () => {
  let component: SalesAndOrdersSnapshot;
  let fixture: ComponentFixture<SalesAndOrdersSnapshot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAndOrdersSnapshot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAndOrdersSnapshot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
