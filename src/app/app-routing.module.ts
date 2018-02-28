import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details/details.component';
import { OfferComponent } from './offer/offer/offer.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { HomeComponent } from './pages/containers/home/home.component';
import { NotFoundComponent } from './pages/containers/not-found/not-found.component';

const routes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'details',
    component: DetailsComponent, // Header, LoadingBar, RouterOutlet
    children: [
      { path: '', loadChildren: 'app/details/details.module#DetailsModule' },
    ]
  }, {
    path: 'offer',
    component: OfferComponent, // Router Outlet TODO: LoadingBar
    children: [
      { path: '', loadChildren: 'app/offer/offer.module#OfferModule' },
    ]
  }, {
    path: 'payment',
    component: PaymentComponent, // Router Outlet TODO: LoadingBar
    children: [
      { path: '', loadChildren: 'app/payment/payment.module#PaymentModule' },
    ]
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
