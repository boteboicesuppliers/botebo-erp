import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPrimary } from './staff-primary';

describe('StaffPrimary', () => {
  let component: StaffPrimary;
  let fixture: ComponentFixture<StaffPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
