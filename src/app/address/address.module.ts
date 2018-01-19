import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms'; // In order to use two way binding
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
// Routing module
import { AddressRoutingModule } from './address-routing.module';
//#region Components
    import { MapComponent } from './containers/map/map.component';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule,
    FormsModule, // In order to use two way binding
  ],
  declarations: [MapComponent]
})
export class AddressModule { }
