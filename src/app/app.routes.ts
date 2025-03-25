import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressListComponent } from './address-list/address-list.component';

export const routes: Routes = [
  { path: '', component: AddressListComponent },
  { path: 'add', component: AddressFormComponent },
];

export const appRouting = provideRouter(routes);
