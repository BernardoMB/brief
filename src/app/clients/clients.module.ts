import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ClientsRoutingModule } from './clients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InitialOfferComponent } from './containers/initial-offer/initial-offer.component';
import { AddExampleComponent } from './containers/add-example/add-example.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientsRoutingModule,
    SharedModule,
  ],
  declarations: [
  InitialOfferComponent,
  AddExampleComponent]
})
export class ClientsModule { }
