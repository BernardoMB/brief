import { Action } from '@ngrx/store';
import { IProfession } from '../../../shared/models/IProfession';
import { IProduct } from '../../shared/models/IProduct';

export const SET_HEADER_TITLE_ACTION = 'SET_HEADER_TITLE_ACTION';
export class SetHeaderTitleAction implements Action {
    readonly type = SET_HEADER_TITLE_ACTION;
    constructor(public payload: string) { }
}

export const SET_HEADER_IMAGE_ACTION = 'SET_HEADER_IMAGE_ACTION';
export class SetHeaderImageAction implements Action {
    readonly type = SET_HEADER_IMAGE_ACTION;
    constructor(public payload: string) { }
}

export const SET_HEADER_OPACITY_ACTION = 'SET_HEADER_OPACITY_ACTION';
export class SetHeaderOpacityAction implements Action {
    readonly type = SET_HEADER_OPACITY_ACTION;
    constructor(public payload: boolean) { }
}

export const SET_OFFER_HEADER_TITLE_ACTION = 'SET_OFFER_HEADER_TITLE_ACTION';
export class SetOfferHeaderTitleAction implements Action {
    readonly type = SET_OFFER_HEADER_TITLE_ACTION;
    constructor(public payload: any) { }
}

export const TURN_ON_IS_LOADING_ACTION = 'TURN_ON_IS_LOADING_ACTION';
export class TurnOnIsLoadingAction implements Action {
    readonly type = TURN_ON_IS_LOADING_ACTION;
    constructor(public payload?: any) { }
}

export const TURN_OFF_IS_LOADING_ACTION = 'TURN_OFF_IS_LOADING_ACTION';
export class TurnOffIsLoadingAction implements Action {
    readonly type = TURN_OFF_IS_LOADING_ACTION;
    constructor(public payload?: any) { }
}

export const USER_CONFIRMED_ACTION = 'USER_CONFIRMED_ACTION';
export class UserConfirmedAction implements Action {
    readonly type = USER_CONFIRMED_ACTION;
    constructor(public payload?: any) { }
}

export const ERROR_OCURRED_ACTION = 'ERROR_OCURRED_ACTION';
export class ErrorOcurredAction implements Action {
    readonly type = ERROR_OCURRED_ACTION;
    constructor(public payload?: any) { }
}

export type UIActions = SetHeaderTitleAction
    | SetHeaderImageAction
    | SetHeaderOpacityAction
    | SetOfferHeaderTitleAction
    | TurnOnIsLoadingAction
    | TurnOffIsLoadingAction
    | UserConfirmedAction
    | ErrorOcurredAction;

