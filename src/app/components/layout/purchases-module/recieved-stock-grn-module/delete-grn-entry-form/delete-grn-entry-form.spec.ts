import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGrnEntryForm } from './delete-grn-entry-form';

describe('DeleteGrnEntryForm', () => {
  let component: DeleteGrnEntryForm;
  let fixture: ComponentFixture<DeleteGrnEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGrnEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGrnEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
