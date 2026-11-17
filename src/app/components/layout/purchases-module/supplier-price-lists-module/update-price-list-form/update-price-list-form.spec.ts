import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriceListForm } from './update-price-list-form';

describe('UpdatePriceListForm', () => {
  let component: UpdatePriceListForm;
  let fixture: ComponentFixture<UpdatePriceListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePriceListForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePriceListForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
