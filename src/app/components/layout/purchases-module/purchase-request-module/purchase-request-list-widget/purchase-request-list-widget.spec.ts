import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestListWidget } from './purchase-request-list-widget';

describe('PurchaseRequestListWidget', () => {
  let component: PurchaseRequestListWidget;
  let fixture: ComponentFixture<PurchaseRequestListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRequestListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseRequestListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
