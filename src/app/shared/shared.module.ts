import { TagInputModule } from 'ngx-chips';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ng-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // In order to use two way binding
import { ToastyModule } from 'ng2-toasty';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { ImgCardComponent } from './components/img-card/img-card.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { InstructionCardComponent } from './components/instruction-card/instruction-card.component';
import { RealImgCardComponent } from './components/real-img-card/real-img-card.component';
import { OptionImgCardComponent } from './components/option-img-card/option-img-card.component';
import { AddExampleModalComponent } from './components/add-example-modal/add-example-modal.component';
import { PlansModalComponent } from './components/plans-modal/plans-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule, // In order to use two way binding
        TooltipModule,
        TagInputModule,
        ToastyModule,
        ModalModule
    ],
    declarations: [
    TitleCardComponent,
    ImgCardComponent,
    ConfirmationModalComponent,
    InstructionCardComponent,
    RealImgCardComponent,
    OptionImgCardComponent,
    AddExampleModalComponent,
    PlansModalComponent],
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
        PlansModalComponent
    ],
    providers : []
})

export class SharedModule { }
