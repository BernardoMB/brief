import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './containers/products/products.component';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
    UiSwitchModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
