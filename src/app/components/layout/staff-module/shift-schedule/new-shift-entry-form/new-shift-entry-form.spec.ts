import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShiftEntryForm } from './new-shift-entry-form';

describe('NewShiftEntryForm', () => {
  let component: NewShiftEntryForm;
  let fixture: ComponentFixture<NewShiftEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewShiftEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShiftEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
