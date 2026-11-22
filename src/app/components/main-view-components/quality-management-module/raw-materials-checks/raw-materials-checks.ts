import { Component } from '@angular/core';
import { RawMaterialsChecksListWidget } from '../../../layout/quality-management-module/raw-materials-checks-module/raw-materials-checks-list-widget/raw-materials-checks-list-widget';

@Component({
  selector: 'app-raw-materials-checks',
  imports: [RawMaterialsChecksListWidget],
  templateUrl: './raw-materials-checks.html',
  styleUrl: './raw-materials-checks.css',
})
export class RawMaterialsChecks {}