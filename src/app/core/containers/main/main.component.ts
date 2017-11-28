import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Action, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IApplicationState } from '../../../store/models/app-state';
import { IProfession } from '../../../../shared/models/IProfession';
import { ErrorOcurredAction, GetAllProfessionsAction } from '../../../store/actions';
import { mapStateToProfessions } from '../../../store/mappers/mapStateToProfessions';
/* import { Router, ActivatedRoute, Params } from '@angular/router'; */
/* import { ILead } from '../../../../shared/models/ILead'; */

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private isLoadingSubscription: Subscription;

  // Route elements
  /* public url: Observable<string>;
  public source: Observable<number>;
  public userData: Observable<ILead>;
  public campaignId: Observable<number>; */

  constructor(private slimLoadingBarService: SlimLoadingBarService,
    private store: Store<IApplicationState>,
    /* private activatedRoute: ActivatedRoute */) {
      /* this.url = activatedRoute.url.map(segments => segments.join(''));
      this.source = activatedRoute.params.map(p => p.source);
      this.userData = activatedRoute.params.map(p => p.userData);
      this.campaignId = activatedRoute.params.map(p => p.campaignId); */
    }

  public ngOnInit(): void {
    // Setting up slim loading bar
    this.isLoadingSubscription = this.store.select(state => state.uiState.isLoading)
        .subscribe(isLoading => isLoading ? this.startLoading() : this.completeLoading());

    // SocketIO configuration
    const socket = io({ path: '/socket' });
    socket.on('UPDATE_STATE', action => {
      this.store.dispatch(action);
    });
    socket.on('connect_timeout', event => this.store.dispatch(new ErrorOcurredAction(event)));
    socket.on('connect_error', error => this.store.dispatch(new ErrorOcurredAction(error)));

    // Routing
    /* this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      console.log(JSON.parse(params.source));
      console.log(JSON.parse(params.userData));
      console.log(JSON.parse(params.campaignId));
    });
    this.source.subscribe(value => {
      console.log('Source', value);
    });
    this.userData.subscribe(value => {
      console.log('User data', value);
    });
    this.campaignId.subscribe(value => {
      console.log('Campaign id', value);
    }); */

    // Get initial data.
    this.store.dispatch(new GetAllProfessionsAction());
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
