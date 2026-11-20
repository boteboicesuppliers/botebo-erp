import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRawMaterialForm } from './delete-raw-material-form';

describe('DeleteRawMaterialForm', () => {
  let component: DeleteRawMaterialForm;
  let fixture: ComponentFixture<DeleteRawMaterialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRawMaterialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRawMaterialForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
