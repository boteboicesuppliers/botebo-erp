import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsPrimary } from './logistics-primary';

describe('LogisticsPrimary', () => {
  let component: LogisticsPrimary;
  let fixture: ComponentFixture<LogisticsPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticsPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
