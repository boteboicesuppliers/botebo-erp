import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAnalysisOverview } from './financial-analysis-overview';

describe('FinancialAnalysisOverview', () => {
  let component: FinancialAnalysisOverview;
  let fixture: ComponentFixture<FinancialAnalysisOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialAnalysisOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialAnalysisOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
