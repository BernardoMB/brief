import * as _ from 'lodash';
import {IApplicationState } from '../models/app-state';

export function mapStateToHeaderTitle(state: IApplicationState): string {
    return state.uiState.headerTitle;
}

export function mapStateToOfferHeaderTitle(state: IApplicationState): string {
    return state.uiState.offerHeaderTitle.title;
}

export function mapStateToOfferHeaderTitleSize(state: IApplicationState): string {
    return state.uiState.offerHeaderTitle.size;
}

