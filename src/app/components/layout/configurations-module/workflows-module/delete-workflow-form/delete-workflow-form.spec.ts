import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkflowForm } from './delete-workflow-form';

describe('DeleteWorkflowForm', () => {
  let component: DeleteWorkflowForm;
  let fixture: ComponentFixture<DeleteWorkflowForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWorkflowForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWorkflowForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
