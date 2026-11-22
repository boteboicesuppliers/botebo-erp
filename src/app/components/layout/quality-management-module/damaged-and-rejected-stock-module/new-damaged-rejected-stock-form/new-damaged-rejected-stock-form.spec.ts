import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDamagedRejectedStockForm } from './new-damaged-rejected-stock-form';

describe('NewDamagedRejectedStockForm', () => {
  let component: NewDamagedRejectedStockForm;
  let fixture: ComponentFixture<NewDamagedRejectedStockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDamagedRejectedStockForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDamagedRejectedStockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
