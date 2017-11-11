import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
// Routing module
import { CoverageRoutingModule } from './coverage-routing.module';
//#region Components
    import { CoverageComponent } from './containers/coverage/coverage.component';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    CoverageRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [CoverageComponent]
})
export class CoverageModule { }
