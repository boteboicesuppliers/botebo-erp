import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProductChecks } from './finished-product-checks';

describe('FinishedProductChecks', () => {
  let component: FinishedProductChecks;
  let fixture: ComponentFixture<FinishedProductChecks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedProductChecks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProductChecks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
