import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinancialStatementModal } from './view-financial-statement-modal';

describe('ViewFinancialStatementModal', () => {
  let component: ViewFinancialStatementModal;
  let fixture: ComponentFixture<ViewFinancialStatementModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFinancialStatementModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFinancialStatementModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
