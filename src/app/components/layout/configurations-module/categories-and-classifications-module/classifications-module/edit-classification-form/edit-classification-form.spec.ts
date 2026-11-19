import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassificationForm } from './edit-classification-form';

describe('EditClassificationForm', () => {
  let component: EditClassificationForm;
  let fixture: ComponentFixture<EditClassificationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClassificationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClassificationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
