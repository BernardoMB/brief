import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { StarRatingModule } from 'angular-star-rating';

import { ActivityRoutingModule } from './activity-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MakerComponent } from './containers/maker/maker.component';
import { GenericComponent } from './containers/generic/generic.component';
import { CoverageComponent } from './containers/coverage/coverage.component';

import { SelectProductComponent } from './containers/select-product/select-product.component';
import { SelectEconomicActivityComponent } from './containers/select-economic-activity/select-economic-activity.component';
import { SelectIndustryComponent } from './containers/select-industry/select-industry.component';
import { SelectServiceComponent } from './containers/select-service/select-service.component';
import { SelectProfessionComponent } from './containers/select-profession/select-profession.component';
import { SelectSpecialtyComponent } from './containers/select-specialty/select-specialty.component';
import { SelectHTypeComponent } from './containers/select-h-type/select-h-type.component';
import { SelectHStartsComponent } from './containers/select-h-starts/select-h-starts.component';
import { SelectRTypeComponent } from './containers/select-r-type/select-r-type.component';
import { SelectRStarsComponent } from './containers/select-r-stars/select-r-stars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivityRoutingModule,
    NguiAutoCompleteModule.forRoot(),
    StarRatingModule,
    SharedModule
  ],
  declarations: [
    MakerComponent,
    GenericComponent,
    CoverageComponent,
    SelectProductComponent,
    SelectEconomicActivityComponent,
    SelectIndustryComponent,
    SelectServiceComponent,
    SelectProfessionComponent,
    SelectSpecialtyComponent,
    SelectHTypeComponent,
    SelectHStartsComponent,
    SelectRTypeComponent,
    SelectRStarsComponent
  ]
})
export class ActivityModule { }
