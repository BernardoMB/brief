import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialOfferComponent } from './containers/initial-offer/initial-offer.component';

const routes: Routes = [
  { path: '', component: InitialOfferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
