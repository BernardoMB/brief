import { Action } from '@ngrx/store';
import { IProfession } from '../../../shared/models/IProfession';
import { ILead } from '../../../shared/models/ILead';
import { IProduct } from '../../shared/models/IProduct';
import { ILocation } from '../../../shared/models/ILocation';

export const SET_LEAD_DATA_INFO_ACTION = 'SET_LEAD_DATA_INFO';
export class SetLeadDataInfoAction implements Action {
    readonly type = SET_LEAD_DATA_INFO_ACTION;
    constructor(public payload: ILead) { }
}
    
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

export const SET_PRODUCT_ACTION = 'SET_PRODUCT_ACTION';
export class SetProductAction implements Action {
    readonly type = SET_PRODUCT_ACTION;
    constructor(public payload: number) { }
}

export const SET_SERVICE_ACTION = 'SET_SERVICE_ACTION';
export class SetServiceAction implements Action {
    readonly type = SET_SERVICE_ACTION;
    constructor(public payload: number) { }
}

export const SET_SPECIALTY_ACTION = 'SET_SPECIALTY_ACTION';
export class SetSpecialtyAction implements Action {
    readonly type = SET_SPECIALTY_ACTION;
    constructor(public payload: number) { }
}

export const SET_LOCATION_ACTION = 'SET_LOCATION_ACTION';
export class SetLocationAction implements Action {
    readonly type = SET_LOCATION_ACTION;
    constructor(public payload: ILocation) { }
}

export type StoreActions = SetLeadDataInfoAction
    | SetActivityAction
    | SetActivityTypeAction
    | SetProductAction
    | SetServiceAction
    | SetSpecialtyAction
    | SetLocationAction;
