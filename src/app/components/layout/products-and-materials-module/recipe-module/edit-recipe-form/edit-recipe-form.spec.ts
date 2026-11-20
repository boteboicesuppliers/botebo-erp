import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeForm } from './edit-recipe-form';

describe('EditRecipeForm', () => {
  let component: EditRecipeForm;
  let fixture: ComponentFixture<EditRecipeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecipeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
