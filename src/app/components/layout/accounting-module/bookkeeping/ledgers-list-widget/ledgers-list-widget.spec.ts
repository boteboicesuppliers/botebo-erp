import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgersListWidget } from './ledgers-list-widget';

describe('LedgersListWidget', () => {
  let component: LedgersListWidget;
  let fixture: ComponentFixture<LedgersListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgersListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgersListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
