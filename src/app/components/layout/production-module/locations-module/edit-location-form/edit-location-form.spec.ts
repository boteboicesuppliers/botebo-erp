import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationForm } from './edit-location-form';

describe('EditLocationForm', () => {
  let component: EditLocationForm;
  let fixture: ComponentFixture<EditLocationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLocationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLocationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
