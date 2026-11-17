import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequisitionForm } from './new-requisition-form';

describe('NewRequisitionForm', () => {
  let component: NewRequisitionForm;
  let fixture: ComponentFixture<NewRequisitionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRequisitionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRequisitionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
