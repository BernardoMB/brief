import * as _ from 'lodash';
import {IApplicationState } from '../models/app-state';

export function mapStateToHeaderTitle(state: IApplicationState): string {
    return state.storeData.headerTitle;
}

