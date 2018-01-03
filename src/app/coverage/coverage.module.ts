import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoverageRoutingModule } from './coverage-routing.module';
import { CoverageComponent } from './containers/coverage/coverage.component';

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
