import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Components
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    NotFoundComponent
  ]
})
export class PagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PagesModule,
      providers: [{provide: LOCALE_ID, useValue : 'es-MX'}]
    };
  }
}
