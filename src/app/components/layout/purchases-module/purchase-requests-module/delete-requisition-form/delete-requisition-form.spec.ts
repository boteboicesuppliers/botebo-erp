import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequisitionForm } from './delete-requisition-form';

describe('DeleteRequisitionForm', () => {
  let component: DeleteRequisitionForm;
  let fixture: ComponentFixture<DeleteRequisitionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRequisitionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRequisitionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
