import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClassificationForm } from './delete-classification-form';

describe('DeleteClassificationForm', () => {
  let component: DeleteClassificationForm;
  let fixture: ComponentFixture<DeleteClassificationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClassificationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteClassificationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
