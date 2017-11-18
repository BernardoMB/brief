// import { SomeInterface } from '../../shared/models/SomeInterface';
import { IProfession } from '../../shared/models/IProfession';
import { Action } from '@ngrx/store';
import { ILocation } from '../../shared/models/ILocation';

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

//#region Activiy
    export const SET_ACTIVITY_ACTION = 'SET_ACTIVITY_ACTION';
    export class SetActivityAction implements Action {
        readonly type = SET_ACTIVITY_ACTION;
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
    | SetLocationAction;

export type UIActions = StoreActions
    | GettingAllProfessionsAction
    | ErrorOcurredAction;
