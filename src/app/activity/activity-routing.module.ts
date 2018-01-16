import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { CoverageComponent } from './containers/coverage/coverage.component';

const routes: Routes = [
  { path: '', component: GenericComponent },

  // Generic (0)
  { path: 'generic', component: GenericComponent },
  { path: 'generic/:source/:userdata/:campaignid', component: GenericComponent },
  // Product (1)
  { path: 'product', component: SelectProductComponent },
  { path: 'product/:source/:userdata/:campaignid', component: SelectProductComponent },
  { path: 'product/eactivity', component: SelectEconomicActivityComponent },
  { path: 'product/eactivity/:source/:userdata/:campaignid/:productid', component: SelectEconomicActivityComponent },
  // Service (2)
  { path: 'service/industry', component: SelectIndustryComponent },
  { path: 'service/industry/:source/:userdata/:campaignid', component: SelectIndustryComponent },
  { path: 'service', component: SelectServiceComponent },
  { path: 'service/:source/:userdata/:campaignid/:industryId', component: SelectServiceComponent },
  // Profession (3)
  { path: 'profession', component: SelectProfessionComponent },
  { path: 'profession/:source/:userdata/:campaignid', component: SelectProfessionComponent },
  { path: 'profession/specialty', component: SelectSpecialtyComponent },
  { path: 'profession/specialty/:source/:userdata/:campaignid/:professionid', component: SelectSpecialtyComponent },
  // Hotel (4)
  { path: 'hotel', component: SelectHTypeComponent },
  { path: 'hotel/:source/:userdata/:campaignid', component: SelectHTypeComponent },
  { path: 'hotel/type', component: SelectHStartsComponent },
  { path: 'hotel/type/:source/:userdata/:campaignid/:htype', component: SelectHStartsComponent },
  // Restaurant (5)
  { path: 'restaurant', component: SelectRTypeComponent },
  { path: 'restaurant/:source/:userdata/:campaignid', component: SelectRTypeComponent },
  { path: 'restaurant/type', component: SelectRStarsComponent },
  { path: 'restaurant/type/:source/:userdata/:campaignid/:rtype', component: SelectRStarsComponent },

  // TODO: Should delete this route.
  { path: 'coverage', component: CoverageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
