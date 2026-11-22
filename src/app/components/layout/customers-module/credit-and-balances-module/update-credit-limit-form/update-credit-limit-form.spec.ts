import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreditLimitForm } from './update-credit-limit-form';

describe('UpdateCreditLimitForm', () => {
  let component: UpdateCreditLimitForm;
  let fixture: ComponentFixture<UpdateCreditLimitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCreditLimitForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCreditLimitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
