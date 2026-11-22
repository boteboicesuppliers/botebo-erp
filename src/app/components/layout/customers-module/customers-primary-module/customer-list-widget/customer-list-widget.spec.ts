import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListWidget } from './customer-list-widget';

describe('CustomerListWidget', () => {
  let component: CustomerListWidget;
  let fixture: ComponentFixture<CustomerListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
