import { ILead } from '../../../shared/models/ILead';
import { IProfession } from '../../../shared/models/IProfession';
import { IActivity } from '../../../shared/models/IActivity';
import { IUser } from '../../../shared/models/IUser';
import { ILocation } from '../../../shared/models/ILocation';
import { IProduct } from '../../shared/models/IProduct';

export interface IStoreData {
    headerTitle: string;
    headerImgUrl: string;
    professions: {[key: string]: IProfession};
    products: {[key: string]: IProduct};
    activity: number;
    activityType: number;
    product: number;
    service: number;
    user: IUser;
    lead: ILead;
    location: ILocation;
    // TODO: Ver que pedo con los productos relacionados que se mostraran despues de procesar cosas en el server.
    relatedProducts: {[key: string]: string};
    confirmed: boolean;
}

export const INITIAL_STORE_DATA: IStoreData = {
    headerTitle: '',
    headerImgUrl: '',
    professions: {},
    products: {},
    activity: undefined,
    activityType: undefined,
    product: undefined,
    service: undefined,
    user: undefined,
    lead: undefined,
    location: undefined,
    relatedProducts: undefined,
    confirmed: false
};
