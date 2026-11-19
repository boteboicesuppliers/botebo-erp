import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryForm } from './delete-category-form';

describe('DeleteCategoryForm', () => {
  let component: DeleteCategoryForm;
  let fixture: ComponentFixture<DeleteCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
