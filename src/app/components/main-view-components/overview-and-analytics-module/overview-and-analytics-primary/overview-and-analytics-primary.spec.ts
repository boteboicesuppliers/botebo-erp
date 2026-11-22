import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAndAnalyticsPrimary } from './overview-and-analytics-primary';

describe('OverviewAndAnalyticsPrimary', () => {
  let component: OverviewAndAnalyticsPrimary;
  let fixture: ComponentFixture<OverviewAndAnalyticsPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewAndAnalyticsPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewAndAnalyticsPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
