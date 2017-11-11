import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
// Routing module
import { ActivityRoutingModule } from './activity-routing.module';
//#region Components
    import { MakerComponent } from './containers/maker/maker.component';
    import { ServiceComponent } from './containers/service/service.component';
    import { ProfessionalComponent } from './containers/professional/professional.component';
    import { GenericComponent } from './containers/generic/generic.component';
    import { RoleComponent } from './containers/role/role.component';
    import { CoverageComponent } from './containers/coverage/coverage.component';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [MakerComponent, ServiceComponent, ProfessionalComponent, GenericComponent, RoleComponent, CoverageComponent]
})
export class ActivityModule { }
