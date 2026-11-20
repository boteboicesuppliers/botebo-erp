import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListWidget } from './recipe-list-widget';

describe('RecipeListWidget', () => {
  let component: RecipeListWidget;
  let fixture: ComponentFixture<RecipeListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
