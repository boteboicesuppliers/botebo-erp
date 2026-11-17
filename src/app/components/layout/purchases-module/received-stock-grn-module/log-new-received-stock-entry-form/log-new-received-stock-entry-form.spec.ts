import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNewReceivedStockEntryForm } from './log-new-received-stock-entry-form';

describe('LogNewReceivedStockEntryForm', () => {
  let component: LogNewReceivedStockEntryForm;
  let fixture: ComponentFixture<LogNewReceivedStockEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogNewReceivedStockEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogNewReceivedStockEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
