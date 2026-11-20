import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinishedGoodForm } from './delete-finished-good-form';

describe('DeleteFinishedGoodForm', () => {
  let component: DeleteFinishedGoodForm;
  let fixture: ComponentFixture<DeleteFinishedGoodForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFinishedGoodForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFinishedGoodForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
