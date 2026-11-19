import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffMemberEntryForm } from './edit-staff-member-entry-form';

describe('EditStaffMemberEntryForm', () => {
  let component: EditStaffMemberEntryForm;
  let fixture: ComponentFixture<EditStaffMemberEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStaffMemberEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStaffMemberEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
