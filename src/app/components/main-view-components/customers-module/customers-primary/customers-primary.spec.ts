import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersPrimary } from './customers-primary';

describe('CustomersPrimary', () => {
  let component: CustomersPrimary;
  let fixture: ComponentFixture<CustomersPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
