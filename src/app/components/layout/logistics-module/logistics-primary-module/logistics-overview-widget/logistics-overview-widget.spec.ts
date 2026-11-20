import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsOverviewWidget } from './logistics-overview-widget';

describe('LogisticsOverviewWidget', () => {
  let component: LogisticsOverviewWidget;
  let fixture: ComponentFixture<LogisticsOverviewWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticsOverviewWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsOverviewWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
