import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinishedProductCheckForm } from './delete-finished-product-check-form';

describe('DeleteFinishedProductCheckForm', () => {
  let component: DeleteFinishedProductCheckForm;
  let fixture: ComponentFixture<DeleteFinishedProductCheckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFinishedProductCheckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFinishedProductCheckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
