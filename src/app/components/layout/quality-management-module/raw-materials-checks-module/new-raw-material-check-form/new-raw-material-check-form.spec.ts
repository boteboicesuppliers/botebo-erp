import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRawMaterialCheckForm } from './new-raw-material-check-form';

describe('NewRawMaterialCheckForm', () => {
  let component: NewRawMaterialCheckForm;
  let fixture: ComponentFixture<NewRawMaterialCheckForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRawMaterialCheckForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRawMaterialCheckForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
