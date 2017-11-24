import { MakerComponent } from './containers/maker/maker.component';
import { ServiceComponent } from './containers/service/service.component';
import { ProfessionalComponent } from './containers/professional/professional.component';
import { GenericComponent } from './containers/generic/generic.component';
import { CoverageComponent } from './containers/coverage/coverage.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GenericComponent },
  // TODO: Cambiar los parametros de las rutas
  { path: 'maker', component: MakerComponent },
  { path: 'maker/:userId/:pene', component: MakerComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'generic', component: GenericComponent },
  // TODO: Should delete this route.
  { path: 'coverage', component: CoverageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
