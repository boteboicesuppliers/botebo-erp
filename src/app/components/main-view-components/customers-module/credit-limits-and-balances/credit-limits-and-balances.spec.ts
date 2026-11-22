import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLimitsAndBalances } from './credit-limits-and-balances';

describe('CreditLimitsAndBalances', () => {
  let component: CreditLimitsAndBalances;
  let fixture: ComponentFixture<CreditLimitsAndBalances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditLimitsAndBalances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLimitsAndBalances);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
