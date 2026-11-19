import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAndClassifications } from './categories-and-classifications';

describe('CategoriesAndClassifications', () => {
  let component: CategoriesAndClassifications;
  let fixture: ComponentFixture<CategoriesAndClassifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesAndClassifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesAndClassifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
