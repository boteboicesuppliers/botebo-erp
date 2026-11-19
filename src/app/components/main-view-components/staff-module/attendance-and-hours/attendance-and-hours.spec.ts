import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceAndHours } from './attendance-and-hours';

describe('AttendanceAndHours', () => {
  let component: AttendanceAndHours;
  let fixture: ComponentFixture<AttendanceAndHours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceAndHours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceAndHours);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
