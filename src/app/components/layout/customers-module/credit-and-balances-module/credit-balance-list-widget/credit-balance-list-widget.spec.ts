import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditBalanceListWidget } from './credit-balance-list-widget';

describe('CreditBalanceListWidget', () => {
  let component: CreditBalanceListWidget;
  let fixture: ComponentFixture<CreditBalanceListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditBalanceListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditBalanceListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
