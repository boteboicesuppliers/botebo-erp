import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOperations } from './daily-operations';

describe('DailyOperations', () => {
  let component: DailyOperations;
  let fixture: ComponentFixture<DailyOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
