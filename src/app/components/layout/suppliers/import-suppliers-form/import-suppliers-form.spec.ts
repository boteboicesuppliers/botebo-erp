import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSuppliersForm } from './import-suppliers-form';

describe('ImportSuppliersForm', () => {
  let component: ImportSuppliersForm;
  let fixture: ComponentFixture<ImportSuppliersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportSuppliersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSuppliersForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
