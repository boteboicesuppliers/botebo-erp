import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCustomersForm } from './import-customers-form';

describe('ImportCustomersForm', () => {
  let component: ImportCustomersForm;
  let fixture: ComponentFixture<ImportCustomersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportCustomersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCustomersForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
