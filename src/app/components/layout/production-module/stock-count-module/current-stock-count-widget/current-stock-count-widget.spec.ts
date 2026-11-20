import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockCountWidget } from './current-stock-count-widget';

describe('CurrentStockCountWidget', () => {
  let component: CurrentStockCountWidget;
  let fixture: ComponentFixture<CurrentStockCountWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStockCountWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStockCountWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
