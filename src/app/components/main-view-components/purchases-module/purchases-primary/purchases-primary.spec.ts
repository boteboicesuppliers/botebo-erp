import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesPrimary } from './purchases-primary';

describe('PurchasesPrimary', () => {
  let component: PurchasesPrimary;
  let fixture: ComponentFixture<PurchasesPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
