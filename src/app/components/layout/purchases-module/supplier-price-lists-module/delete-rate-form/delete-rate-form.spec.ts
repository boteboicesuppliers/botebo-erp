import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRateForm } from './delete-rate-form';

describe('DeleteRateForm', () => {
  let component: DeleteRateForm;
  let fixture: ComponentFixture<DeleteRateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
