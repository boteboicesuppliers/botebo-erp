import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAgingWidget } from './invoice-aging-widget';

describe('InvoiceAgingWidget', () => {
  let component: InvoiceAgingWidget;
  let fixture: ComponentFixture<InvoiceAgingWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceAgingWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceAgingWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
