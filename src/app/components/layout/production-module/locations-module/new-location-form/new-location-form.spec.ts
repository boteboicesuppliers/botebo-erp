import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocationForm } from './new-location-form';

describe('NewLocationForm', () => {
  let component: NewLocationForm;
  let fixture: ComponentFixture<NewLocationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLocationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLocationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
