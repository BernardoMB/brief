import { INITIAL_APPLICATION_STATE } from '../models/app-state';
import { INITIAL_UI_STATE, IUIState } from './../models/ui-state';
import { Action } from '@ngrx/store';
//#region Actions
    import { UIActions,
        GETTING_ALL_PROFESSIONS_ACTION,
        UPDATE_ALL_PROFESSIOS_ACTION,
        GETTING_ALL_PRODUCTS_ACTION,
        UPDATE_ALL_PRODUCTS_ACTION, 
        TURN_ON_IS_LOADING_ACTION,
        TURN_OFF_IS_LOADING_ACTION} from './../actions';
//#endregion

export function uiState(state: IUIState = INITIAL_UI_STATE, action: UIActions): IUIState {
    switch (action.type) {
        case GETTING_ALL_PRODUCTS_ACTION:
        case GETTING_ALL_PROFESSIONS_ACTION:
        case TURN_ON_IS_LOADING_ACTION:
            return handleLoadDataAction(state, action);
        case UPDATE_ALL_PROFESSIOS_ACTION:
        case UPDATE_ALL_PRODUCTS_ACTION:
        case TURN_OFF_IS_LOADING_ACTION:
            return handleLoadedDataAction(state, action);
        default:
            return state;
    }
}

function handleLoadDataAction(state: IUIState, action: UIActions) {
    const newUiState = Object.assign({}, state, { isLoading: true});
    return newUiState;
}

function handleLoadedDataAction(state: IUIState, action: UIActions) {
    const newUiState = Object.assign({}, state, { isLoading: false});
    return newUiState;
}
