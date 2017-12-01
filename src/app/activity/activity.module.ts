import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivityRoutingModule } from './activity-routing.module';
import { MakerComponent } from './containers/maker/maker.component';
import { GenericComponent } from './containers/generic/generic.component';
import { CoverageComponent } from './containers/coverage/coverage.component';
import { SelectProductComponent } from './containers/select-product/select-product.component';
import { SelectEconomicActivityComponent } from './containers/select-economic-activity/select-economic-activity.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [
    MakerComponent,
    GenericComponent,
    CoverageComponent,
    SelectProductComponent,
    SelectEconomicActivityComponent
  ]
})
export class ActivityModule { }
