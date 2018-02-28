import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialPaymentComponent } from './containers/initial-payment/initial-payment.component';

const routes: Routes = [
  { path: '', component: InitialPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
