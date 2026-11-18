import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGrnEntryForm } from './new-grn-entry-form';

describe('NewGrnEntryForm', () => {
  let component: NewGrnEntryForm;
  let fixture: ComponentFixture<NewGrnEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGrnEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGrnEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
