import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDamagedRejectedStockForm } from './delete-damaged-rejected-stock-form';

describe('DeleteDamagedRejectedStockForm', () => {
  let component: DeleteDamagedRejectedStockForm;
  let fixture: ComponentFixture<DeleteDamagedRejectedStockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDamagedRejectedStockForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDamagedRejectedStockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
