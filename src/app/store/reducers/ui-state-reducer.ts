import { INITIAL_UI_STATE, IUIState } from './../models/ui-state';
import { Action } from '@ngrx/store';
import {
    TURN_ON_IS_LOADING_ACTION, TURN_OFF_IS_LOADING_ACTION, UIActions,
    USER_CONFIRMED_ACTION, SET_HEADER_TITLE_ACTION, SET_HEADER_IMAGE_ACTION, SET_HEADER_OPACITY_ACTION, UserConfirmedAction, SetHeaderTitleAction, SetHeaderImageAction, SetHeaderOpacityAction, SET_OFFER_HEADER_TITLE_ACTION, SetOfferHeaderTitleAction
} from '../actions/uiState.actions';

export function uiStateReducer(state: IUIState = INITIAL_UI_STATE, action: UIActions): IUIState {
    switch (action.type) {
        // Details header
        case SET_HEADER_TITLE_ACTION:
            return handleSetHeaderTitleAction(state, action);
        case SET_HEADER_IMAGE_ACTION:
            return handleSetHeaderImageAction(state, action);
        case SET_HEADER_OPACITY_ACTION:
            return handleSetHeaderOpacityAction(state, action);
        // Offer header
        case SET_OFFER_HEADER_TITLE_ACTION:
            return handleSetOfferHeaderTitleAction(state, action);

        case TURN_ON_IS_LOADING_ACTION:
            return handleLoadDataAction(state, action);
        case TURN_OFF_IS_LOADING_ACTION:
            return handleLoadedDataAction(state, action);
        case USER_CONFIRMED_ACTION:
            return handleUserConfirmedAction(state, action);
        default:
            return state;
    }
}

function handleSetHeaderTitleAction(state: IUIState, action: SetHeaderTitleAction): IUIState {
    const newStoreData = Object.assign({}, state);
    newStoreData.headerTitle = action.payload;
    return newStoreData;
}

function handleSetHeaderImageAction(state: IUIState, action: SetHeaderImageAction): IUIState {
    const newStoreData = Object.assign({}, state);
    newStoreData.headerImgUrl = action.payload;
    return newStoreData;
}

function handleSetHeaderOpacityAction(state: IUIState, action: SetHeaderOpacityAction): IUIState {
    const newStoreData = Object.assign({}, state);
    newStoreData.headerOpacity = action.payload;
    return newStoreData;
}

function handleSetOfferHeaderTitleAction(state: IUIState, action: SetOfferHeaderTitleAction): IUIState {
    const newStoreData = Object.assign({}, state);
    if (action.payload.size) {
        newStoreData.offerHeaderTitle = action.payload;
    } else {
        newStoreData.offerHeaderTitle = { title: action.payload.title, size: '25px' };
    }
    return newStoreData;
}

function handleLoadDataAction(state: IUIState, action: UIActions) {
    const newUiState = Object.assign({}, state, { isLoading: true });
    return newUiState;
}

function handleLoadedDataAction(state: IUIState, action: UIActions) {
    const newUiState = Object.assign({}, state, { isLoading: false });
    return newUiState;
}

function handleUserConfirmedAction(state: IUIState, action: UserConfirmedAction): IUIState {
    const newStoreData = Object.assign({}, state);
    newStoreData.confirmed = true;
    return newStoreData;
}