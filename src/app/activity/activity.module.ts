import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
// Routing module
import { ActivityRoutingModule } from './activity-routing.module';
//#region Components
    import { MakerComponent } from './containers/maker/maker.component';
    import { ProductComponent } from './containers/product/product.component';
    import { ServiceComponent } from './containers/service/service.component';
    import { ProfessionalComponent } from './containers/professional/professional.component';
    import { GenericComponent } from './containers/generic/generic.component';
    import { CoverageComponent } from './containers/coverage/coverage.component';
import { ProductTypeComponent } from './containers/product-type/product-type.component';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [
    MakerComponent,
    ProductComponent,
    ServiceComponent,
    ProfessionalComponent,
    GenericComponent,
    CoverageComponent,
    ProductTypeComponent
  ]
})
export class ActivityModule { }
