import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListWidget } from './categories-list-widget';

describe('CategoriesListWidget', () => {
  let component: CategoriesListWidget;
  let fixture: ComponentFixture<CategoriesListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
