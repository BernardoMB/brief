import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
// Routing module
import { ProductsRoutingModule } from './products-routing.module';
//#region Components
    import { ProductsComponent } from './containers/products/products.component';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
