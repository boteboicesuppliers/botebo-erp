import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrnEntryForm } from './edit-grn-entry-form';

describe('EditGrnEntryForm', () => {
  let component: EditGrnEntryForm;
  let fixture: ComponentFixture<EditGrnEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGrnEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGrnEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
