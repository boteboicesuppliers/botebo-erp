import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListWidget } from './invoice-list-widget';

describe('InvoiceListWidget', () => {
  let component: InvoiceListWidget;
  let fixture: ComponentFixture<InvoiceListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
