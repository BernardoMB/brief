import { TagInputModule } from 'ngx-chips';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ng-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { ImgCardComponent } from './components/img-card/img-card.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        TooltipModule,
        TagInputModule,
        ToastyModule,
        ModalModule
    ],
    declarations: [
    TitleCardComponent,
    ImgCardComponent,
    ConfirmationModalComponent],
    exports: [
        TooltipModule,
        ToastyModule,
        ModalModule,
        TitleCardComponent,
        ImgCardComponent,
        ConfirmationModalComponent
    ],
    providers : []
})

export class SharedModule { }
