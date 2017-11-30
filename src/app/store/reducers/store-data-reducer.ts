import { IProfession } from '../../../shared/models/IProfession';
import { INITIAL_STORE_DATA, IStoreData } from './../models/store-data';
import * as _ from 'lodash';
import {
    StoreActions,
    UPDATE_ALL_PROFESSIOS_ACTION,
    UpdateAllProfessionsAction,
    SET_ACTIVITY_ACTION,
    SetActivityAction,
    SET_LOCATION_ACTION,
    SetLocationAction,
    SET_LEAD_DATA_INFO_ACTION,
    SetLeadDataInfoAction,
    SET_ACTIVITY_TYPE_ACTION,
    SetActivityTypeAction,
    SET_PRODUCT_ACTION,
    SetProductAction
} from './../actions';
import { ILocation } from '../../../shared/models/ILocation';
import { ILead } from '../../../shared/models/ILead';

export function storeData(state: IStoreData = INITIAL_STORE_DATA, action: StoreActions): IStoreData {
    switch (action.type) {
        case UPDATE_ALL_PROFESSIOS_ACTION:
            return handleUpdateProfessionsAction(state, action);
        case SET_ACTIVITY_ACTION:
            return handleSetActivityAction(state, action);
        case SET_ACTIVITY_TYPE_ACTION:
            return handleSetActivityTypeAction(state, action);
        case SET_PRODUCT_ACTION:
            return handleSetProductAction(state, action);
        case SET_LOCATION_ACTION:
            return handleSetLocationAction(state, action);
        case SET_LEAD_DATA_INFO_ACTION:
            return handleSetLeadDataInfoAction(state, action);
        default:
            return state;
    }
}

function handleUpdateProfessionsAction(state: IStoreData, action: UpdateAllProfessionsAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const newProfessions: {[key: string]: IProfession} = {};
    action.payload.forEach(profession => newProfessions[profession.id] = profession);
    newStoreData.professions = Object.assign({}, newProfessions);
    return newStoreData;
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
