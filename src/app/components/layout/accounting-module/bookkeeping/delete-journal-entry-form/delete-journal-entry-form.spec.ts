import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJournalEntryForm } from './delete-journal-entry-form';

describe('DeleteJournalEntryForm', () => {
  let component: DeleteJournalEntryForm;
  let fixture: ComponentFixture<DeleteJournalEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteJournalEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJournalEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
