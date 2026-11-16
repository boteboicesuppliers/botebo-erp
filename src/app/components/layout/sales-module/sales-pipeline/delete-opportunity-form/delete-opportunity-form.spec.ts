import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOpportunityForm } from './delete-opportunity-form';

describe('DeleteOpportunityForm', () => {
  let component: DeleteOpportunityForm;
  let fixture: ComponentFixture<DeleteOpportunityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteOpportunityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOpportunityForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
