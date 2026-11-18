import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchaseEntryForm } from './delete-purchase-entry-form';

describe('DeletePurchaseEntryForm', () => {
  let component: DeletePurchaseEntryForm;
  let fixture: ComponentFixture<DeletePurchaseEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePurchaseEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePurchaseEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
