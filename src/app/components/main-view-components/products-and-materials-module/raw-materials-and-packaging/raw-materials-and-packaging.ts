import { Component } from '@angular/core';
import { RawMaterialsAndPackagingListWidget } from '../../../layout/products-and-materials-module/raw-materials-and-packaging-module/raw-materials-and-packaging-list-widget/raw-materials-and-packaging-list-widget';

@Component({
  selector: 'app-raw-materials-and-packaging',
  imports: [RawMaterialsAndPackagingListWidget],
  templateUrl: './raw-materials-and-packaging.html',
  styleUrl: './raw-materials-and-packaging.css',
})
export class RawMaterialsAndPackaging {}