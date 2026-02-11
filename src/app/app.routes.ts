import { Routes } from '@angular/router';
import { Layout } from "./shared/components/layout/layout";

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      {
        path: 'customers',
        loadComponent: () => import('./features/customers/customer-management/customer-management').then(m => m.CustomerManagement)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./features/accounts/account-management/account-management').then(m => m.AccountManagement)
      }
    ]
  },
  { path: '**', redirectTo: 'customers' }
];
