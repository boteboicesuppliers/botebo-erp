import { Component } from '@angular/core';
import { RecipeListWidget } from '../../../layout/products-and-materials-module/recipe-module/recipe-list-widget/recipe-list-widget';

@Component({
  selector: 'app-recipe',
  imports: [RecipeListWidget],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe {}