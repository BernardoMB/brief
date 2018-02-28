import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from './store/models/app-state';
import { ErrorOcurredAction } from './store/actions/uiState.actions';
import * as io from 'socket.io-client';

@Component({
  selector: 'brief-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'brief';
  public socket;

  constructor(private store: Store<IApplicationState>) {
      // SocketIO Configuration
      this.socket = io();
      // this.socket = io({ path: '/socket' });
      this.socket.on('UPDATE_STATE', action => {
        this.store.dispatch(action);
      });
      this.socket.on('connect_timeout', event => this.store.dispatch(new ErrorOcurredAction(event)));
      this.socket.on('connect_error', error => this.store.dispatch(new ErrorOcurredAction(error)));
    }

}
