import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPaymentForm } from './record-payment-form';

describe('RecordPaymentForm', () => {
  let component: RecordPaymentForm;
  let fixture: ComponentFixture<RecordPaymentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordPaymentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordPaymentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
