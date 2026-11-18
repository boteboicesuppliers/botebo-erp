import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchaseEntryForm } from './new-purchase-entry-form';

describe('NewPurchaseEntryForm', () => {
  let component: NewPurchaseEntryForm;
  let fixture: ComponentFixture<NewPurchaseEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPurchaseEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPurchaseEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
