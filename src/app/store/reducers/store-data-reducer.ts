import { IProfession } from '../../../shared/models/IProfession';
import { INITIAL_STORE_DATA, IStoreData } from './../models/store-data';
import * as _ from 'lodash';
import {
    SET_ACTIVITY_ACTION,
    SET_ACTIVITY_TYPE_ACTION,
    SET_LEAD_DATA_INFO_ACTION,
    SET_LOCATION_ACTION,
    SET_PRODUCT_ACTION,
    SET_SERVICE_ACTION,
    SetActivityAction,
    SetActivityTypeAction,
    SetLeadDataInfoAction,
    SetLocationAction,
    SetProductAction,
    SetServiceAction,
    StoreActions,
    UPDATE_ALL_PROFESSIOS_ACTION,
    UpdateAllProfessionsAction,
    USER_CONFIRMED_ACTION,
    UserConfirmedAction,
    SET_HEADER_TITLE_ACTION,
    SetHeaderTitleAction,
    SET_HEADER_IMAGE_ACTION,
    SetHeaderImageAction,
    UPDATE_ALL_PRODUCTS_ACTION,
    UpdateAllProductsAction,
    SET_HEADER_OPACITY_ACTION,
    SetHeaderOpacityAction,
} from './../actions';
import { ILocation } from '../../../shared/models/ILocation';
import { ILead } from '../../../shared/models/ILead';
import { IProduct } from '../../shared/models/IProduct';

export function storeData(state: IStoreData = INITIAL_STORE_DATA, action: StoreActions): IStoreData {
    switch (action.type) {
        case UPDATE_ALL_PROFESSIOS_ACTION:
            return handleUpdateAllProfessionsAction(state, action);
        case UPDATE_ALL_PRODUCTS_ACTION:
            return handleUpdateAllProductsAction(state, action);
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
        case USER_CONFIRMED_ACTION:
            return handleUserConfirmedAction(state, action);
        case SET_HEADER_TITLE_ACTION:
            return handleSetHeaderTitleAction(state, action);
        case SET_HEADER_IMAGE_ACTION:
            return handleSetHeaderImageAction(state, action);
        case SET_HEADER_OPACITY_ACTION:
            return handleSetHeaderOpacityAction(state, action);
        default:
            return state;
    }
}

function handleUpdateAllProfessionsAction(state: IStoreData, action: UpdateAllProfessionsAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const newProfessions: {[key: string]: IProfession} = {};
    action.payload.forEach(profession => newProfessions[profession.id] = profession);
    newStoreData.professions = Object.assign({}, newProfessions);
    return newStoreData;
}

function handleUpdateAllProductsAction(state: IStoreData, action: UpdateAllProductsAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    const newProducts: {[key: string]: IProduct} = {};
    action.payload.forEach((product: any) => {
        newProducts[product._id] = product;
    });
    newStoreData.products = Object.assign({}, newProducts);
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

function handleUserConfirmedAction(state: IStoreData, action: UserConfirmedAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    newStoreData.confirmed = true;
    return newStoreData;
}

function handleSetHeaderTitleAction(state: IStoreData, action: SetHeaderTitleAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    newStoreData.headerTitle = action.payload;
    return newStoreData;
}

function handleSetHeaderImageAction(state: IStoreData, action: SetHeaderImageAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    newStoreData.headerImgUrl = action.payload;
    return newStoreData;
}

function handleSetHeaderOpacityAction(state: IStoreData, action: SetHeaderOpacityAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    newStoreData.headerOpacity = action.payload;
    return newStoreData;
}
