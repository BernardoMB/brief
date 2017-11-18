import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToastyService, ToastyConfig, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import {
    GET_ALL_PROFESSIONS_ACTION,
    GetAllProfessionsAction,
    UPDATE_ALL_PROFESSIOS_ACTION,
    UpdateAllProfessionsAction,
} from './../actions';

@Injectable()
export class ProfessionEffectService {

    private socket: any;

    @Effect({dispatch: false})
    onGetAllProfessions$: Observable<Action> = this.action$
        .ofType(GET_ALL_PROFESSIONS_ACTION)
        .debug('Getting all professions')
        .do((action: GetAllProfessionsAction) => {
            this.socket.emit('clientGetAllProfessions', action.payload);
            this.toastyService.info({
                title: 'Obteniendo todas las profesiones disponibles.',
                msg: `${moment().locale('es').calendar()}`,
                showClose: true,
                timeout: 2500
            });
        });

    @Effect({dispatch: false})
    onUpdateInitialData$: Observable<Action> = this.action$
        .ofType(UPDATE_ALL_PROFESSIOS_ACTION)
        .debug('Professions updated')
        .do((action: UpdateAllProfessionsAction) => {
            this.toastyService.success({
                title: 'Profesiones y oficios cargados',
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
