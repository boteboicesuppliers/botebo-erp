import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMembersListWidget } from './staff-members-list-widget';

describe('StaffMembersListWidget', () => {
  let component: StaffMembersListWidget;
  let fixture: ComponentFixture<StaffMembersListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffMembersListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMembersListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
