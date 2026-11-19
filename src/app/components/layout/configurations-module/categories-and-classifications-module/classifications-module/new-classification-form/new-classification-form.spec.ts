import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassificationForm } from './new-classification-form';

describe('NewClassificationForm', () => {
  let component: NewClassificationForm;
  let fixture: ComponentFixture<NewClassificationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClassificationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClassificationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
