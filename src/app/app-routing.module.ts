import { NgModule } from '@angular/core';
import { LoadChildren, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/containers/main/main.component';
import { LaunchpadComponent } from './core/containers/launchpad/launchpad.component';
import { OfferComponent } from './core/containers/offer/offer.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: LaunchpadComponent},
      { path: 'activity', loadChildren: 'app/activity/activity.module#ActivityModule' },
      { path: 'address', loadChildren: 'app/address/address.module#AddressModule' },
      { path: 'coverage', loadChildren: 'app/coverage/coverage.module#CoverageModule' }
    ]
  }, {
    path: 'offer', component: OfferComponent,
    children: [
      { path: 'clients', loadChildren: 'app/clients/clients.module#ClientsModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
