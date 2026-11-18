import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedStockGrn } from './recieved-stock-grn';

describe('RecievedStockGrn', () => {
  let component: RecievedStockGrn;
  let fixture: ComponentFixture<RecievedStockGrn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecievedStockGrn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecievedStockGrn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
