import * as _ from 'lodash';
import {IApplicationState } from '../models/app-state';

export function mapStateToHeaderImgUrl(state: IApplicationState): string {
    return state.uiState.headerImgUrl;
}
