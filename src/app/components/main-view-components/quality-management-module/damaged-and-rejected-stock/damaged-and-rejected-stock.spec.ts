import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedAndRejectedStock } from './damaged-and-rejected-stock';

describe('DamagedAndRejectedStock', () => {
  let component: DamagedAndRejectedStock;
  let fixture: ComponentFixture<DamagedAndRejectedStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamagedAndRejectedStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamagedAndRejectedStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
