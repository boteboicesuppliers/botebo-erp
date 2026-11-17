import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesModule } from './purchases-module';

describe('PurchasesModule', () => {
  let component: PurchasesModule;
  let fixture: ComponentFixture<PurchasesModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
