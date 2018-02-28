import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer/offer.component';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
import { InitialOfferComponent } from './containers/initial-offer/initial-offer.component';
import { SharedModule } from '../shared/shared.module';
// Nice features
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AddExampleComponent } from './containers/add-example/add-example.component';
import { ClientsExampleComponent } from './containers/clients-example/clients-example.component';

@NgModule({
  imports: [
    CommonModule,
    OfferRoutingModule,
    SharedModule,
    // Nice features
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    OfferComponent,
    InitialOfferComponent,
    AddExampleComponent,
    ClientsExampleComponent
  ]
})
export class OfferModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OfferModule,
      providers: [{provide: LOCALE_ID, useValue : 'es-MX'}, TooltipConfig]
    };
  }
}
