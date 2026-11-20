import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipeForm } from './delete-recipe-form';

describe('DeleteRecipeForm', () => {
  let component: DeleteRecipeForm;
  let fixture: ComponentFixture<DeleteRecipeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRecipeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRecipeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
