import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { IApplicationState, INITIAL_APPLICATION_STATE } from './../models/app-state';
import { compose } from '@ngrx/core/compose';
import { environment } from './../../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { storeData } from './store-data-reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { uiState } from './ui-state-reducer';

const reducers = {uiState, storeData, router: routerReducer};

const developmentReducer: ActionReducer<IApplicationState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IApplicationState> = combineReducers(reducers);

export function reducer(state: IApplicationState = INITIAL_APPLICATION_STATE, action: Action){
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}
