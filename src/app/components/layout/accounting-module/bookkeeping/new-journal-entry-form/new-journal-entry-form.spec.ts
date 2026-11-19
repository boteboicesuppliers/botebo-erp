import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJournalEntryForm } from './new-journal-entry-form';

describe('NewJournalEntryForm', () => {
  let component: NewJournalEntryForm;
  let fixture: ComponentFixture<NewJournalEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewJournalEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJournalEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
