import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDamagedRejectedStockForm } from './edit-damaged-rejected-stock-form';

describe('EditDamagedRejectedStockForm', () => {
  let component: EditDamagedRejectedStockForm;
  let fixture: ComponentFixture<EditDamagedRejectedStockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDamagedRejectedStockForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDamagedRejectedStockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
