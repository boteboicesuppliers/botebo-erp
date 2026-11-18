import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequisitionForm } from './edit-requisition-form';

describe('EditRequisitionForm', () => {
  let component: EditRequisitionForm;
  let fixture: ComponentFixture<EditRequisitionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRequisitionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequisitionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
