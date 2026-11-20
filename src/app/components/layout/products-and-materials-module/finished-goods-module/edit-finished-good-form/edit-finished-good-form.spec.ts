import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinishedGoodForm } from './edit-finished-good-form';

describe('EditFinishedGoodForm', () => {
  let component: EditFinishedGoodForm;
  let fixture: ComponentFixture<EditFinishedGoodForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFinishedGoodForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFinishedGoodForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
