import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseEntryForm } from './edit-purchase-entry-form';

describe('EditPurchaseEntryForm', () => {
  let component: EditPurchaseEntryForm;
  let fixture: ComponentFixture<EditPurchaseEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPurchaseEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchaseEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
