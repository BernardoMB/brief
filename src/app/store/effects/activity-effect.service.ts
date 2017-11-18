import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToastyService, ToastyConfig, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { SET_ACTIVITY_ACTION, SetActivityAction } from '../actions';

@Injectable()
export class ActivityEffectService {

    private socket: any;

    @Effect({dispatch: false})
    onSetActivity$: Observable<Action> = this.action$
        .ofType(SET_ACTIVITY_ACTION)
        .debug('Getting all professions')
        .do((action: SetActivityAction) => {
            this.toastyService.success({
                title: 'Actividad fijada.',
                msg: `${moment().locale('es').calendar()}`,
                showClose: true,
                timeout: 2500
            });
        });

    constructor(
        private action$: Actions,
        public toastyService: ToastyService,
        public  toastyConfig: ToastyConfig) {
        this.socket = io({path: '/socket'});
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'bottom-center';
    }
}
