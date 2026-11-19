import { Component } from '@angular/core';
import { CategoriesListWidget } from '../../../layout/configurations-module/categories-and-classifications-module/categories-module/categories-list-widget/categories-list-widget';
import { ClassificationsListWidget } from '../../../layout/configurations-module/categories-and-classifications-module/classifications-module/classifications-list-widget/classifications-list-widget';

@Component({
  selector: 'app-categories-and-classifications',
  imports: [CategoriesListWidget, ClassificationsListWidget],
  templateUrl: './categories-and-classifications.html',
  styleUrl: './categories-and-classifications.css',
})
export class CategoriesAndClassifications {}