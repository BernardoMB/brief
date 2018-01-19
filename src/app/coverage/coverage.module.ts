import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms'; // In order to use two way binding
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoverageRoutingModule } from './coverage-routing.module';
import { CoverageComponent } from './containers/coverage/coverage.component';
import { SelectStatesComponent } from './containers/select-states/select-states.component';
import { ChecklistModule } from 'angular-checklist';

@NgModule({
  imports: [
    CommonModule,
    CoverageRoutingModule,
    SharedModule,
    FormsModule, // In order to use two way binding
    ChecklistModule
  ],
  declarations: [CoverageComponent, SelectStatesComponent],
})
export class CoverageModule { }
