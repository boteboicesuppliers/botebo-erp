import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLocationForm } from './delete-location-form';

describe('DeleteLocationForm', () => {
  let component: DeleteLocationForm;
  let fixture: ComponentFixture<DeleteLocationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLocationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLocationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
