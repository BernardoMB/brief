import { go } from '@ngrx/router-store';
import { Observable, Subscription } from 'rxjs/Rx';
import { Action, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
//#region Sockets Support
  import * as io from 'socket.io-client';
//#endregion
//#region Services
  import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
//#endregion
//#region Interfaces
  import { IApplicationState } from '../../../store/models/app-state';
  import { IProfession } from '../../../../shared/models/IProfession';
//#endregion
//#region Actions
  import { ErrorOcurredAction, GetAllProfessionsAction } from '../../../store/actions';
//#endregion
//#region Mappers
  import { mapStateToProfessions } from '../../../store/mappers/mapStateToProfessions';
//#endregion

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private isLoadingSubscription: Subscription;

  constructor(private slimLoadingBarService: SlimLoadingBarService,
    private store: Store<IApplicationState>) { }

  public ngOnInit(): void {
    this.isLoadingSubscription = this.store.select(state => state.uiState.isLoading)
    .subscribe(isLoading => isLoading ? this.startLoading() : this.completeLoading());

    this.store.dispatch(new GetAllProfessionsAction());

    // SocketIO configuration
    const socket = io({ path: '/socket' });
    socket.on('UPDATE_STATE', action => {
      this.store.dispatch(action);
    });
    socket.on('connect_timeout', event => this.store.dispatch(new ErrorOcurredAction(event)));
    socket.on('connect_error', error => this.store.dispatch(new ErrorOcurredAction(error)));
  }

  public ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
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
