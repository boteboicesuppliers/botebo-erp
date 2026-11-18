import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesListWidget } from './purchases-list-widget';

describe('PurchasesListWidget', () => {
  let component: PurchasesListWidget;
  let fixture: ComponentFixture<PurchasesListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
