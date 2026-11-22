import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedAndRejectedStockListWidget } from './damaged-and-rejected-stock-list-widget';

describe('DamagedAndRejectedStockListWidget', () => {
  let component: DamagedAndRejectedStockListWidget;
  let fixture: ComponentFixture<DamagedAndRejectedStockListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamagedAndRejectedStockListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamagedAndRejectedStockListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
