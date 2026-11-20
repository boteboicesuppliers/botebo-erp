import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockCountForm } from './update-stock-count-form';

describe('UpdateStockCountForm', () => {
  let component: UpdateStockCountForm;
  let fixture: ComponentFixture<UpdateStockCountForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStockCountForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStockCountForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
