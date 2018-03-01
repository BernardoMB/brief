import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextButtonComponent } from './components/next-button/next-button.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { InstructionCardComponent } from './components/instruction-card/instruction-card.component';
import { OptionsListComponent } from './components/options-list/options-list.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RealImgCardComponent } from './components/real-img-card/real-img-card.component';
import { OptionImgCardComponent } from './components/option-img-card/option-img-card.component';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { AddExampleModalComponent } from './components/add-example-modal/add-example-modal.component';
import { PlansModalComponent } from './components/plans-modal/plans-modal.component';
import { PaymentMethodModalComponent } from './components/payment-method-modal/payment-method-modal.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    StarRatingModule,
    FormsModule // To suppot ngModel two way binding
  ],
  declarations: [
    NextButtonComponent,
    RegisterModalComponent,
    HeaderComponent,
    InstructionCardComponent,
    OptionsListComponent,
    ConfirmationModalComponent,
    StarRatingComponent,
    RealImgCardComponent,
    OptionImgCardComponent,
    AddExampleModalComponent,
    PlansModalComponent,
    PaymentMethodModalComponent,
    PaymentCardComponent
  ],
  exports: [
    ModalModule,
    NextButtonComponent,
    RegisterModalComponent,
    HeaderComponent,
    InstructionCardComponent,
    OptionsListComponent,
    ConfirmationModalComponent,
    StarRatingComponent,
    RealImgCardComponent,
    OptionImgCardComponent,
    AddExampleModalComponent,
    PlansModalComponent,
    PaymentMethodModalComponent,
    PaymentCardComponent
  ],
  providers: [AuthService]
})
export class SharedModule { }
