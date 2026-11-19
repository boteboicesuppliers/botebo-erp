import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceListWidget } from './attendance-list-widget';

describe('AttendanceListWidget', () => {
  let component: AttendanceListWidget;
  let fixture: ComponentFixture<AttendanceListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
