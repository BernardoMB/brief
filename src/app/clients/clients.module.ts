import { FormsModule } from '@angular/forms'; // In order to use two way binding
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ClientsRoutingModule } from './clients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InitialOfferComponent } from './containers/initial-offer/initial-offer.component';
import { AddExampleComponent } from './containers/add-example/add-example.component';
import { ClientsExampleComponent } from './containers/clients-example/clients-example.component';
import { PaymentComponent } from './containers/payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // In order to use two way binding
    ClientsRoutingModule,
    SharedModule,
  ],
  declarations: [
  InitialOfferComponent,
  AddExampleComponent,
  ClientsExampleComponent,
  PaymentComponent]
})
export class ClientsModule { }
