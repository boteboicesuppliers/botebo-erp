import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedStockGrn } from './received-stock-grn';

describe('ReceivedStockGrn', () => {
  let component: ReceivedStockGrn;
  let fixture: ComponentFixture<ReceivedStockGrn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedStockGrn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedStockGrn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
