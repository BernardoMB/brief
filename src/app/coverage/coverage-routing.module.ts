import { CoverageComponent } from './containers/coverage/coverage.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectStatesComponent } from './containers/select-states/select-states.component';

const routes: Routes = [
  { path: '', component: CoverageComponent },
  { path: 'states', component: SelectStatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverageRoutingModule { }
