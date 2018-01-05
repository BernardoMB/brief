import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialOfferComponent } from './containers/initial-offer/initial-offer.component';
import { AddExampleComponent } from './containers/add-example/add-example.component';

const routes: Routes = [
  { path: 'initial', component: InitialOfferComponent},
  { path: 'adds', component: AddExampleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
