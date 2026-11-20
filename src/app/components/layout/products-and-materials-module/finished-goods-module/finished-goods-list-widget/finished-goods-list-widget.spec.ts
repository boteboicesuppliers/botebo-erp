import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGoodsListWidget } from './finished-goods-list-widget';

describe('FinishedGoodsListWidget', () => {
  let component: FinishedGoodsListWidget;
  let fixture: ComponentFixture<FinishedGoodsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedGoodsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedGoodsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
