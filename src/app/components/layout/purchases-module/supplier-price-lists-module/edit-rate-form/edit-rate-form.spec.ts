import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRateForm } from './edit-rate-form';

describe('EditRateForm', () => {
  let component: EditRateForm;
  let fixture: ComponentFixture<EditRateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
