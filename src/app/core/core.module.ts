import { ModalModule } from 'ng-bootstrap/modal';
import { LOCALE_ID, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // In order to use two way binding
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './containers/main/main.component';
import { LaunchpadComponent } from './containers/launchpad/launchpad.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { CookieModule } from 'ngx-cookie';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DndModule } from 'ng2-dnd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Header2Component } from './components/header2/header2.component';
import { OfferComponent } from './containers/offer/offer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // In order to use two way binding
    BrowserAnimationsModule,
    SharedModule,
    ClickOutsideModule,
    CookieModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    ToastyModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    DndModule.forRoot(),
    NgbModule
  ],
  declarations: [
    MainComponent,
    LaunchpadComponent,
    HeaderComponent,
    Header2Component,
    OfferComponent
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule, // In order to use two way binding
    CookieModule,
    ButtonsModule,
    TooltipModule,
    ToastyModule,
    BsDropdownModule,
    ModalModule,
    SlimLoadingBarModule,
    DndModule,
    SharedModule,
    MainComponent,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule ) {
    if (parentModule) {
      throw new Error ('Error, core module already exists.');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{provide: LOCALE_ID, useValue : 'es-MX'}, TooltipConfig]
    };
  }
 }
