import * as _ from 'lodash';
import {IApplicationState } from '../models/app-state';
import { IProfession } from '../../../shared/models/IProfession';

export function mapStateToProfessions(state: IApplicationState): Array<IProfession> {
    return _.values(state.storeData.professions);
}

