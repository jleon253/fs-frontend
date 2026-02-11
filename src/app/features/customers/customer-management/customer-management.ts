import { Component } from '@angular/core';
import { CustomerForm } from "../customer-form/customer-form";
import { CustomerList } from "../customer-list/customer-list";

@Component({
  selector: 'app-customer-management',
  imports: [CustomerForm, CustomerList],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
})
export class CustomerManagement {

}
