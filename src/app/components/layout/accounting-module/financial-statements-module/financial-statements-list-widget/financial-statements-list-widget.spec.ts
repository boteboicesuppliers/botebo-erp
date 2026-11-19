import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementsListWidget } from './financial-statements-list-widget';

describe('FinancialStatementsListWidget', () => {
  let component: FinancialStatementsListWidget;
  let fixture: ComponentFixture<FinancialStatementsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialStatementsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialStatementsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
