import { IProfession } from '../../../shared/models/IProfession';
import { IActivity } from '../../../shared/models/IActivity';
import { IUser } from '../../../shared/models/IUser';
import { ILocation } from '../../../shared/models/ILocation';

export interface IStoreData {
    professions: {[key: string]: IProfession};
    activity: number;
    user: IUser;
    location: ILocation;
    // TODO: Ver que pedo con los productos relacionados que se mostraran despues de procesar cosas en el server.
    relatedProducts: {[key: string]: string};
}

export const INITIAL_STORE_DATA: IStoreData = {
    professions: {},
    activity: undefined,
    user: undefined,
    location: undefined,
    relatedProducts: undefined
};
