import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStaffMemberForm } from './delete-staff-member-form';

describe('DeleteStaffMemberForm', () => {
  let component: DeleteStaffMemberForm;
  let fixture: ComponentFixture<DeleteStaffMemberForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteStaffMemberForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteStaffMemberForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
