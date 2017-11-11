import { IProfession } from '../../../shared/models/IProfession';
import { INITIAL_STORE_DATA, IStoreData } from './../models/store-data';
import * as _ from 'lodash';
//#region Actions
    import { StoreActions, UPDATE_ALL_PROFESSIOS_ACTION, UpdateAllProfessionsAction } from './../actions';
//#endregion

export function storeData(state: IStoreData = INITIAL_STORE_DATA, action: StoreActions): IStoreData {
    switch (action.type) {
        case UPDATE_ALL_PROFESSIOS_ACTION:
            return handleUpdateProfessionsAction(state, action);
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
