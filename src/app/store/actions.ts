// import { SomeInterface } from '../../shared/models/SomeInterface';
import { IProfession } from '../../shared/models/IProfession';
import { Action } from '@ngrx/store';
import { ILocation } from '../../shared/models/ILocation';
import { ILead } from '../../shared/models/ILead';

export const SET_HEADER_TITLE_ACTION = 'SET_HEADER_TITLE_ACTION';
export class SetHeaderTitleAction implements Action {
    readonly type = SET_HEADER_TITLE_ACTION;
    constructor(public payload: string) { }
}

//#region Professions
    export const GET_ALL_PROFESSIONS_ACTION = 'GET_ALL_PROFESSIONS_ACTION';
    export class GetAllProfessionsAction implements Action {
        readonly type = GET_ALL_PROFESSIONS_ACTION;
        constructor(public payload?: any) { }
    }

    export const GETTING_ALL_PROFESSIONS_ACTION = 'GETTING_ALL_PROFESSIONS_ACTION';
    export class GettingAllProfessionsAction implements Action {
        readonly type = GETTING_ALL_PROFESSIONS_ACTION;
        constructor(public payload?: any) { }
    }

    export const UPDATE_ALL_PROFESSIOS_ACTION = 'UPDATE_ALL_PROFESSIOS_ACTION';
    export class UpdateAllProfessionsAction implements Action {
        readonly type = UPDATE_ALL_PROFESSIOS_ACTION;
        constructor(public payload: Array<IProfession>) { }
    }
//#endregion

//#region Lead
    export const SET_LEAD_DATA_INFO_ACTION = 'SET_LEAD_DATA_INFO';
    export class SetLeadDataInfoAction implements Action {
        readonly type = SET_LEAD_DATA_INFO_ACTION;
        constructor(public payload: ILead) { }
    }
//#endregion

//#region Activiy
    export const SET_ACTIVITY_ACTION = 'SET_ACTIVITY_ACTION';
    export class SetActivityAction implements Action {
        readonly type = SET_ACTIVITY_ACTION;
        constructor(public payload: number) { }
    }
    export const SET_ACTIVITY_TYPE_ACTION = 'SET_ACTIVITY_TYPE_ACTION';
    export class SetActivityTypeAction implements Action {
        readonly type = SET_ACTIVITY_TYPE_ACTION;
        constructor(public payload: number) { }
    }
//#endregion

//#region Product
    export const SET_PRODUCT_ACTION = 'SET_PRODUCT_ACTION';
    export class SetProductAction implements Action {
        readonly type = SET_PRODUCT_ACTION;
        constructor(public payload: number) { }
    }
//#endregion

//#region Service
    export const SET_SERVICE_ACTION = 'SET_SERVICE_ACTION';
    export class SetServiceAction implements Action {
        readonly type = SET_SERVICE_ACTION;
        constructor(public payload: number) { }
    }
//#endregion

//#region Professional
    export const SET_SPECIALTY_ACTION = 'SET_SPECIALTY_ACTION';
    export class SetSpecialtyAction implements Action {
        readonly type = SET_SPECIALTY_ACTION;
        constructor(public payload: number) { }
    }
//#endregion

//#region Location
    export const SET_LOCATION_ACTION = 'SET_LOCATION_ACTION';
    export class SetLocationAction implements Action {
        readonly type = SET_LOCATION_ACTION;
        constructor(public payload: ILocation) { }
    }
//#endregion

export const USER_CONFIRMED_ACTION = 'USER_CONFIRMED_ACTION';
export class UserConfirmedAction implements Action {
    readonly type = USER_CONFIRMED_ACTION;
    constructor(public payload?: any) { }
}

//#region Error
    export const ERROR_OCURRED_ACTION = 'ERROR_OCURRED_ACTION';
    /**
     * UiState Action
     * This action is emitted whenever an unexpected error is encountered.
     *
     * @export
     * @class ErrorOcurredAction
     * @implements {Action}
     */
    export class ErrorOcurredAction implements Action {
        readonly type = ERROR_OCURRED_ACTION;
        constructor(public payload?: any) { }
    }
//#endregion

export type StoreActions =
    | GetAllProfessionsAction
    | UpdateAllProfessionsAction
    | SetActivityAction
    | SetActivityTypeAction
    | SetProductAction
    | SetServiceAction
    | SetSpecialtyAction
    | SetLocationAction
    | SetLeadDataInfoAction
    | UserConfirmedAction
    | SetHeaderTitleAction;

export type UIActions = StoreActions
    | GettingAllProfessionsAction
    | ErrorOcurredAction;
