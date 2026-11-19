import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProjections } from './financial-projections';

describe('FinancialProjections', () => {
  let component: FinancialProjections;
  let fixture: ComponentFixture<FinancialProjections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProjections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProjections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
