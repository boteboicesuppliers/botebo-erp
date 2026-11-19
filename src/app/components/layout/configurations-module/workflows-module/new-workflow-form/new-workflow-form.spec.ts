import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkflowForm } from './new-workflow-form';

describe('NewWorkflowForm', () => {
  let component: NewWorkflowForm;
  let fixture: ComponentFixture<NewWorkflowForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWorkflowForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWorkflowForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
