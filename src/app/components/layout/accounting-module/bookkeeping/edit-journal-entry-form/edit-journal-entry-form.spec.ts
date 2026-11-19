import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJournalEntryForm } from './edit-journal-entry-form';

describe('EditJournalEntryForm', () => {
  let component: EditJournalEntryForm;
  let fixture: ComponentFixture<EditJournalEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditJournalEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJournalEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
