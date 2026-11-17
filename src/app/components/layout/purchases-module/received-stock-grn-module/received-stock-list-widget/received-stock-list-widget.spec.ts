import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedStockListWidget } from './received-stock-list-widget';

describe('ReceivedStockListWidget', () => {
  let component: ReceivedStockListWidget;
  let fixture: ComponentFixture<ReceivedStockListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedStockListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedStockListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
