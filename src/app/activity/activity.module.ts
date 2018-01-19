import { FormsModule } from '@angular/forms'; // In order to use two way binding
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { StarRatingModule } from 'angular-star-rating';
import { ActivityRoutingModule } from './activity-routing.module';
import { SharedModule } from '../shared/shared.module';

import { GenericComponent } from './containers/generic/generic.component';
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
    FormsModule, // In order to use two way binding
    ActivityRoutingModule,
    NguiAutoCompleteModule.forRoot(),
    StarRatingModule,
    SharedModule
  ],
  declarations: [
    GenericComponent,
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
