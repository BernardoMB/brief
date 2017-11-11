import { INITIAL_UI_STATE, IUIState } from './ui-state';
import { INITIAL_STORE_DATA, IStoreData } from './store-data';
import { RouterState } from '@ngrx/router-store';

export interface IApplicationState {
    router: RouterState;
    uiState: IUIState;
    storeData: IStoreData;
}

export const INITIAL_APPLICATION_STATE: IApplicationState = {
    router: { path: '' },
    uiState: INITIAL_UI_STATE,
    storeData: INITIAL_STORE_DATA
};
