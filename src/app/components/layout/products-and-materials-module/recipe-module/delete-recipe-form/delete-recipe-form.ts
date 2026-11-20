import { Component, input, output } from '@angular/core';
import { RecipeRecord } from '../recipe-list-widget/recipe-list-widget';

@Component({
  selector: 'app-delete-recipe-form',
  imports: [],
  templateUrl: './delete-recipe-form.html',
  styleUrl: './delete-recipe-form.css',
})
export class DeleteRecipeForm {
  recipe = input.required<RecipeRecord>();
  close = output<void>();
  confirmDelete = output<string>();
}