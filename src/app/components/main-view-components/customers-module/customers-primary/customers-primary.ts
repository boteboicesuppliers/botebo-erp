import { Component } from '@angular/core';
import { CustomersPrimary as CustomersPrimaryLayout } from '../../../layout/customers-module/customers-primary/customers-primary';

@Component({
  selector: 'app-customers-primary',
  imports: [CustomersPrimaryLayout],
  templateUrl: './customers-primary.html',
  styleUrl: './customers-primary.css',
})
export class CustomersPrimary {}