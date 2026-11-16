import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineBoardWidget } from './pipeline-board-widget';

describe('PipelineBoardWidget', () => {
  let component: PipelineBoardWidget;
  let fixture: ComponentFixture<PipelineBoardWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineBoardWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineBoardWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
