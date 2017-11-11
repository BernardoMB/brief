import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
  ],
  declarations: [MapComponent]
})
export class AddressModule { }
