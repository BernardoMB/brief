import { MakerComponent } from './containers/maker/maker.component';
import { GenericComponent } from './containers/generic/generic.component';
import { CoverageComponent } from './containers/coverage/coverage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectProductComponent } from './containers/select-product/select-product.component';
import { SelectEconomicActivityComponent } from './containers/select-economic-activity/select-economic-activity.component';
import { SelectIndustryComponent } from './containers/select-industry/select-industry.component';
import { SelectServiceComponent } from './containers/select-service/select-service.component';

const routes: Routes = [
  { path: '', component: GenericComponent },
  { path: 'maker', component: MakerComponent },
  { path: 'maker/:source/:userdata/:campaignid', component: MakerComponent },

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
  /* { path: 'service/:source/:userdata/:campaignid/:indistryid', component: SelectServiceComponent }, */
  // SelectIndustryComponent: ServiceComponent
  // SelectServiceComponent : ServiceTypeComponent
  // Profession (3)
  /* { path: 'profession/:source/:userdata/:campaignid', component: SelectProfessionComponent },
  { path: 'profession/specialty/:source/:userdata/:campaignid/:professionid', component: SelectSpecialtyComponent }, */
  // SelectProfessionComponent : ProfessionalComponent
  // SelectSpecialty : ProfessionalTypeComponent
  // Stablishment (4)
  /* { path: 'establishment/:source/:userdata/:campaignid/:eid', component: SelectEstablishmentTypeComponent },
  { path: 'establishment/starts/:source/:userdata/:campaignid/:eid/:etypeid', component: SelectStarsComponent }, */
  
  
  
  // Generic
  { path: 'generic', component: GenericComponent },
  { path: 'generic/:source/:userdata/:campaignid', component: GenericComponent },
  // TODO: Should delete this route.
  { path: 'coverage', component: CoverageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
