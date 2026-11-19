import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkflowForm } from './edit-workflow-form';

describe('EditWorkflowForm', () => {
  let component: EditWorkflowForm;
  let fixture: ComponentFixture<EditWorkflowForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkflowForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkflowForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
