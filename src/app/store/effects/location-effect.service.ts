import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToastyService, ToastyConfig, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { SET_LOCATION_ACTION } from '../actions/storeData.actions';

@Injectable()
export class LocationEffectService {

    private socket: any;

    @Effect({dispatch: false})
    onSetLocation$: Observable<Action> = this.action$
        .ofType(SET_LOCATION_ACTION)
        .map(action => {
            this.toastyService.success({
                title: 'Ubicación fijada.',
                msg: `${moment().locale('es').calendar()}`,
                showClose: true,
                timeout: 2500
            });
            return action;
        })

    constructor(
        private action$: Actions,
        public toastyService: ToastyService,
        public  toastyConfig: ToastyConfig) {
        // SocketIO configuration
        this.socket = io();
        // SocketIO Configuration with proxy
        // this.socket = io({path: '/socket'});
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'bottom-center';
    }
}
