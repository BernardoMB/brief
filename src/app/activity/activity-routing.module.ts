import { MakerComponent } from './containers/maker/maker.component';
import { ServiceComponent } from './containers/service/service.component';
import { ProfessionalComponent } from './containers/professional/professional.component';
import { GenericComponent } from './containers/generic/generic.component';
import { CoverageComponent } from './containers/coverage/coverage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GenericComponent },
  { path: 'maker', component: MakerComponent },
  { path: 'maker/:source/:userdata/:campaignid', component: MakerComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service/:source/:userdata/:campaignid', component: ServiceComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'professional/:source/:userdata/:campaignid', component: ProfessionalComponent },
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
