import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpportunityForm } from './edit-opportunity-form';

describe('EditOpportunityForm', () => {
  let component: EditOpportunityForm;
  let fixture: ComponentFixture<EditOpportunityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOpportunityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOpportunityForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
