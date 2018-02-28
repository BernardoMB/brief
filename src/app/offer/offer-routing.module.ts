import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialOfferComponent } from './containers/initial-offer/initial-offer.component';
import { AddExampleComponent } from './containers/add-example/add-example.component';
import { ClientsExampleComponent } from './containers/clients-example/clients-example.component';

const routes: Routes = [
  { path: 'initial', component: InitialOfferComponent },
  { path: 'adds', component: AddExampleComponent },
  { path: 'clients', component: ClientsExampleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
