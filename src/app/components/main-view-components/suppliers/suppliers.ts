import { Component } from '@angular/core';
import { SuppliersListWidget } from '../../layout/suppliers/suppliers-list-widget/suppliers-list-widget';

@Component({
  selector: 'app-suppliers',
  imports: [SuppliersListWidget],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class Suppliers {

}
