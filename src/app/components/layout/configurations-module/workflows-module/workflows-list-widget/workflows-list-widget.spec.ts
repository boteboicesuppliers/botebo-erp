import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsListWidget } from './workflows-list-widget';

describe('WorkflowsListWidget', () => {
  let component: WorkflowsListWidget;
  let fixture: ComponentFixture<WorkflowsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
