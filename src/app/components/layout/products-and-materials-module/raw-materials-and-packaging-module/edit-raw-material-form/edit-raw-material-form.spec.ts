import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRawMaterialForm } from './edit-raw-material-form';

describe('EditRawMaterialForm', () => {
  let component: EditRawMaterialForm;
  let fixture: ComponentFixture<EditRawMaterialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRawMaterialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRawMaterialForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
