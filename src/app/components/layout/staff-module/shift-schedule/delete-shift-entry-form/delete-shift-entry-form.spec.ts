import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShiftEntryForm } from './delete-shift-entry-form';

describe('DeleteShiftEntryForm', () => {
  let component: DeleteShiftEntryForm;
  let fixture: ComponentFixture<DeleteShiftEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteShiftEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShiftEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
