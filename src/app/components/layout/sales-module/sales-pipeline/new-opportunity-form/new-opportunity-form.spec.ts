import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOpportunityForm } from './new-opportunity-form';

describe('NewOpportunityForm', () => {
  let component: NewOpportunityForm;
  let fixture: ComponentFixture<NewOpportunityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOpportunityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOpportunityForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
