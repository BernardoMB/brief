import { IProfession } from '../../../shared/models/IProfession';
import { INITIAL_STORE_DATA, IStoreData } from './../models/store-data';
import * as _ from 'lodash';
import { ILocation } from '../../../shared/models/ILocation';
import { ILead } from '../../../shared/models/ILead';
import { IProduct } from '../../shared/models/IProduct';
import { SET_ACTIVITY_ACTION, SET_ACTIVITY_TYPE_ACTION, SET_PRODUCT_ACTION, SET_SERVICE_ACTION, SET_LOCATION_ACTION, SET_LEAD_DATA_INFO_ACTION, SetActivityAction, SetActivityTypeAction, SetProductAction, SetServiceAction, SetLocationAction, SetLeadDataInfoAction, StoreActions } from '../actions/storeData.actions';
import { USER_CONFIRMED_ACTION, SET_HEADER_TITLE_ACTION, SET_HEADER_IMAGE_ACTION, SET_HEADER_OPACITY_ACTION, UserConfirmedAction, SetHeaderTitleAction, SetHeaderImageAction, SetHeaderOpacityAction } from '../actions/uiState.actions';

export function storeDataReducer(state: IStoreData = INITIAL_STORE_DATA, action: StoreActions): IStoreData {
    switch (action.type) {
        case SET_ACTIVITY_ACTION:
            return handleSetActivityAction(state, action);
        case SET_ACTIVITY_TYPE_ACTION:
            return handleSetActivityTypeAction(state, action);
        case SET_PRODUCT_ACTION:
            return handleSetProductAction(state, action);
        case SET_SERVICE_ACTION:
            return handleSetServiceAction(state, action);
        case SET_LOCATION_ACTION:
            return handleSetLocationAction(state, action);
        case SET_LEAD_DATA_INFO_ACTION:
            return handleSetLeadDataInfoAction(state, action);
        default:
            return state;
    }
}

function handleSetActivityAction(state: IStoreData, action: SetActivityAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const activity: number = action.payload;
    newStoreData.activity = activity;
    return newStoreData;
}

function handleSetActivityTypeAction(state: IStoreData, action: SetActivityTypeAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const activityType: number = action.payload;
    newStoreData.activityType = activityType;
    return newStoreData;
}

function handleSetProductAction(state: IStoreData, action: SetProductAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const product: number = action.payload;
    newStoreData.product = product;
    return newStoreData;
}

function handleSetServiceAction(state: IStoreData, action: SetServiceAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const service: number = action.payload;
    newStoreData.service = service;
    return newStoreData;
}

function handleSetLocationAction(state: IStoreData, action: SetLocationAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const location: ILocation = action.payload;
    newStoreData.location = location;
    return newStoreData;
}

function handleSetLeadDataInfoAction(state: IStoreData, action: SetLeadDataInfoAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const lead: ILead = action.payload;
    newStoreData.lead = lead;
    return newStoreData;
}
