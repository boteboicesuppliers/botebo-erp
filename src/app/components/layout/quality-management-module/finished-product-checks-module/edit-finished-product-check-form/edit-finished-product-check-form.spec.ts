import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinishedProductCheckForm } from './edit-finished-product-check-form';

describe('EditFinishedProductCheckForm', () => {
  let component: EditFinishedProductCheckForm;
  let fixture: ComponentFixture<EditFinishedProductCheckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFinishedProductCheckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFinishedProductCheckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
