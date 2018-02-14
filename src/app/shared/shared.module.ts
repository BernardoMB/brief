import {TagInputModule} from 'ngx-chips';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {RouterModule} from '@angular/router';
import {TabsModule} from 'ng-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'; // In order to use two way binding
import {ToastyModule} from 'ng2-toasty';
import {TitleCardComponent} from './components/title-card/title-card.component';
import {ImgCardComponent} from './components/img-card/img-card.component';
import {ConfirmationModalComponent} from './components/confirmation-modal/confirmation-modal.component';
import {InstructionCardComponent} from './components/instruction-card/instruction-card.component';
import {RealImgCardComponent} from './components/real-img-card/real-img-card.component';
import {OptionImgCardComponent} from './components/option-img-card/option-img-card.component';
import {AddExampleModalComponent} from './components/add-example-modal/add-example-modal.component';
import {PlansModalComponent} from './components/plans-modal/plans-modal.component';
import {OptionsListComponent} from './components/options-list/options-list.component';
import {NextButtonComponent} from './components/next-button/next-button.component';
import {StarRatingComponent} from './components/star-rating/star-rating.component';
import {StarRatingModule} from 'angular-star-rating';
import {RegisterModalComponent} from './components/register-modal/register-modal.component';
import {AuthService} from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // In order to use two way binding
    TooltipModule,
    TagInputModule,
    ToastyModule,
    ModalModule,
    StarRatingModule
  ],
  declarations: [
    TitleCardComponent,
    ImgCardComponent,
    ConfirmationModalComponent,
    InstructionCardComponent,
    RealImgCardComponent,
    OptionImgCardComponent,
    AddExampleModalComponent,
    PlansModalComponent,
    OptionsListComponent,
    NextButtonComponent,
    StarRatingComponent,
    RegisterModalComponent],
  exports: [
    TooltipModule,
    ToastyModule,
    ModalModule,
    TitleCardComponent,
    ImgCardComponent,
    ConfirmationModalComponent,
    InstructionCardComponent,
    RealImgCardComponent,
    OptionImgCardComponent,
    AddExampleModalComponent,
    PlansModalComponent,
    OptionsListComponent,
    NextButtonComponent,
    StarRatingComponent,
    RegisterModalComponent
  ],
  providers: [AuthService]
})

export class SharedModule {
}
