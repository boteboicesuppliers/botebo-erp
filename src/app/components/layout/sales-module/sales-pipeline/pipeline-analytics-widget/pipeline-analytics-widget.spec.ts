import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineAnalyticsWidget } from './pipeline-analytics-widget';

describe('PipelineAnalyticsWidget', () => {
  let component: PipelineAnalyticsWidget;
  let fixture: ComponentFixture<PipelineAnalyticsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineAnalyticsWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineAnalyticsWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
