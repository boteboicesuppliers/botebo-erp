import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCount } from './stock-count';

describe('StockCount', () => {
  let component: StockCount;
  let fixture: ComponentFixture<StockCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
