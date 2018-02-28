import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { DetailsModule } from './details/details.module';
import { OfferModule } from './offer/offer.module';
import { PaymentModule } from './payment/payment.module';
import { NgRxModule } from './store/ngrx.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // My modules
    PagesModule.forRoot(),
    DetailsModule.forRoot(),
    OfferModule.forRoot(),
    PaymentModule.forRoot(),
    // Store
    // See for more info about the new version of NgRx
    /* gist.github.com/btroncone/a6e4347326749f938510 */
    /* toddmotto.com/ngrx-store-understanding-state-selectors */
    NgRxModule,
    // Nice features
    ToastyModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    // Fire base
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase')
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
