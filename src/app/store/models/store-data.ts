import { IProfession } from '../../../shared/models/IProfession';
import { IActivity } from '../../../shared/models/IActivity';

export interface IStoreData {
    professions: {[key: string]: IProfession};
    activity: IActivity;
}

export const INITIAL_STORE_DATA: IStoreData = {
    professions: {},
    activity: undefined
};
