import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRawMaterialCheckForm } from './edit-raw-material-check-form';

describe('EditRawMaterialCheckForm', () => {
  let component: EditRawMaterialCheckForm;
  let fixture: ComponentFixture<EditRawMaterialCheckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRawMaterialCheckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRawMaterialCheckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
