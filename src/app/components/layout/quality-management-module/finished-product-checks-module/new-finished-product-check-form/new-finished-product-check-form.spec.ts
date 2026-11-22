import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinishedProductCheckForm } from './new-finished-product-check-form';

describe('NewFinishedProductCheckForm', () => {
  let component: NewFinishedProductCheckForm;
  let fixture: ComponentFixture<NewFinishedProductCheckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFinishedProductCheckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFinishedProductCheckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
