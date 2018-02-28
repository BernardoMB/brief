import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
import { InitialPaymentComponent } from './containers/initial-payment/initial-payment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ],
  declarations: [
    PaymentComponent,
    InitialPaymentComponent
  ]
})
export class PaymentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaymentModule,
      providers: [{provide: LOCALE_ID, useValue : 'es-MX'}, TooltipConfig]
    };
  }
}
