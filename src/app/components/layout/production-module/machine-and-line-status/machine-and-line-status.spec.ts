import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineAndLineStatus } from './machine-and-line-status';

describe('MachineAndLineStatus', () => {
  let component: MachineAndLineStatus;
  let fixture: ComponentFixture<MachineAndLineStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineAndLineStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineAndLineStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
