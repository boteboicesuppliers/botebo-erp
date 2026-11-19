import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsListWidget } from './shifts-list-widget';

describe('ShiftsListWidget', () => {
  let component: ShiftsListWidget;
  let fixture: ComponentFixture<ShiftsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
