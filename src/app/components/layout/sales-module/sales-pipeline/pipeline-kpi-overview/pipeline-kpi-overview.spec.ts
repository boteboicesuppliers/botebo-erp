import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineKpiOverview } from './pipeline-kpi-overview';

describe('PipelineKpiOverview', () => {
  let component: PipelineKpiOverview;
  let fixture: ComponentFixture<PipelineKpiOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineKpiOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineKpiOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
