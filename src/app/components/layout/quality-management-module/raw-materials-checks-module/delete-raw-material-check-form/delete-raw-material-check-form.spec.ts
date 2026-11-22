import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRawMaterialCheckForm } from './delete-raw-material-check-form';

describe('DeleteRawMaterialCheckForm', () => {
  let component: DeleteRawMaterialCheckForm;
  let fixture: ComponentFixture<DeleteRawMaterialCheckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRawMaterialCheckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRawMaterialCheckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
