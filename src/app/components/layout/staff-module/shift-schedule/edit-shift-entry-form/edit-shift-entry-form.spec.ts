import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShiftEntryForm } from './edit-shift-entry-form';

describe('EditShiftEntryForm', () => {
  let component: EditShiftEntryForm;
  let fixture: ComponentFixture<EditShiftEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditShiftEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShiftEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
