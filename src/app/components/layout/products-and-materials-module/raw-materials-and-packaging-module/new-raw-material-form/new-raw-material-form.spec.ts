import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRawMaterialForm } from './new-raw-material-form';

describe('NewRawMaterialForm', () => {
  let component: NewRawMaterialForm;
  let fixture: ComponentFixture<NewRawMaterialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRawMaterialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRawMaterialForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
