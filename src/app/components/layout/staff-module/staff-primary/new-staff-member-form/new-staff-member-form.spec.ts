import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaffMemberForm } from './new-staff-member-form';

describe('NewStaffMemberForm', () => {
  let component: NewStaffMemberForm;
  let fixture: ComponentFixture<NewStaffMemberForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStaffMemberForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStaffMemberForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
