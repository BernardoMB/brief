import { CoverageComponent } from './containers/coverage/coverage.component';
import { RoleComponent } from './containers/role/role.component';
import { MakerComponent } from './containers/maker/maker.component';
import { ServiceComponent } from './containers/service/service.component';
import { ProfessionalComponent } from './containers/professional/professional.component';
import { GenericComponent } from './containers/generic/generic.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GenericComponent },
  { path: 'maker', component: MakerComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'generic', component: GenericComponent },
  { path: 'role', component: RoleComponent },
  { path: 'coverage', component: CoverageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
