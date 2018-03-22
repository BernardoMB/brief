import { NgModule, LOCALE_ID, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // In order to use two way binding
import { DetailsComponent } from './details/details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from '../shared/shared.module';
// Nice features
import { StarRatingModule } from 'angular-star-rating';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { Ng2CompleterModule } from 'ng2-completer';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ChecklistModule } from 'angular-checklist';
// Components
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
import { MapComponent } from './containers/map/map.component';
import { CoverageComponent } from './containers/coverage/coverage.component';
import { SelectStatesComponent } from './containers/select-states/select-states.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // In order to use two way binding
    DetailsRoutingModule,
    SharedModule,
    // Nice features
    ChecklistModule,
    StarRatingModule,
    NguiAutoCompleteModule,
    Ng2CompleterModule,
    SlimLoadingBarModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    DetailsComponent,
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
    SelectRStarsComponent,
    MapComponent,
    CoverageComponent,
    SelectStatesComponent
  ]
})
export class DetailsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DetailsModule,
      providers: [{provide: LOCALE_ID, useValue : 'es-MX'}, TooltipConfig]
    };
  }
}
