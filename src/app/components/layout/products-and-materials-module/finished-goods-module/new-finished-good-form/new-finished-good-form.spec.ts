import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinishedGoodForm } from './new-finished-good-form';

describe('NewFinishedGoodForm', () => {
  let component: NewFinishedGoodForm;
  let fixture: ComponentFixture<NewFinishedGoodForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFinishedGoodForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFinishedGoodForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
