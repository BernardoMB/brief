import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { ErrorOcurredAction } from '../../../store/actions';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  private isLoadingSubscription: Subscription;
  public socket;

  constructor(private slimLoadingBarService: SlimLoadingBarService,
    private store: Store<IApplicationState>) {
      // SocketIO Configuration
      // this.socket = io();
      this.socket = io({ path: '/socket' });
      this.socket.on('UPDATE_STATE', action => {
        this.store.dispatch(action);
      });
      this.socket.on('connect_timeout', event => this.store.dispatch(new ErrorOcurredAction(event)));
      this.socket.on('connect_error', error => this.store.dispatch(new ErrorOcurredAction(error)));
    }

  ngOnInit() {
    this.isLoadingSubscription = this.store.select(state => state.uiState.isLoading)
        .subscribe(isLoading => isLoading ? this.startLoading() : this.completeLoading());

    // SocketIO configuration with a proxy.
    /* const socket = io({ path: '/socket' });
    socket.on('UPDATE_STATE', action => {
      this.store.dispatch(action);
    });
    socket.on('connect_timeout', event => this.store.dispatch(new ErrorOcurredAction(event)));
    socket.on('connect_error', error => this.store.dispatch(new ErrorOcurredAction(error))); */
  }

  //#region Loading bar
    public startLoading(): void {
      this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
      });
    }
    public stopLoading(): void {
        this.slimLoadingBarService.stop();
    }
    public completeLoading(): void {
        this.slimLoadingBarService.complete();
    }
  //#endregion

}
