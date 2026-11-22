import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProductChecksListWidget } from './finished-product-checks-list-widget';

describe('FinishedProductChecksListWidget', () => {
  let component: FinishedProductChecksListWidget;
  let fixture: ComponentFixture<FinishedProductChecksListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedProductChecksListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProductChecksListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
