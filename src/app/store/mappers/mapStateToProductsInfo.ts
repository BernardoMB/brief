import { IApplicationState } from '../models/app-state';
import * as _ from 'lodash';
import { IProduct } from '../../shared/models/IProduct';

export function mapStateToProductsInfo(state: IApplicationState): Array<any> {
    const products: Array<IProduct> = _.values(state.storeData.products);
    return products;
}
