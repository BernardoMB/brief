import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToastyService, ToastyConfig, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { SET_PRODUCT_ACTION,
    SetProductAction,
    GET_ALL_PRODUCTS_ACTION,
    GetAllProductsAction,
    UPDATE_ALL_PRODUCTS_ACTION } from '../actions';

@Injectable()
export class ProductEffectService {

    private socket: any;

    @Effect({ dispatch: false })
    onGetAllProductsAction$: Observable<Action> = this.action$
        .ofType(GET_ALL_PRODUCTS_ACTION)
        .debug('Getting all products')
        .do((action: GetAllProductsAction) => {
            this.toastyService.info({
                title: 'Getting all products',
                msg: `${moment().locale('es').calendar()}`,
                showClose: true,
                timeout: 1500
            });
            this.socket.emit('clientGetAllProducts', action.payload);
        });

    @Effect({ dispatch: false })
    onUpdateAllProductsAction$: Observable<Action> = this.action$
        .ofType(UPDATE_ALL_PRODUCTS_ACTION)
        .debug('Products updated')
        .do(action => {
            this.toastyService.success({
                title: 'All products updated',
                msg: `${moment().locale('es').calendar()}`,
                showClose: true,
                timeout: 1500
            });
        });

    @Effect({dispatch: false})
    onSetProductAction$: Observable<Action> = this.action$
        .ofType(SET_PRODUCT_ACTION)
        .debug('Setting product')
        .do((action: SetProductAction) => {
            this.toastyService.success({
                title: 'Producto fijado.',
                msg: `${moment().locale('es').calendar()}`,
                showClose: true,
                timeout: 2500
            });
        });

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
