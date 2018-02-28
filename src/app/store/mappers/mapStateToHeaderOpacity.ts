import {IApplicationState } from '../models/app-state';

export function mapStateToHeaderOpacity(state: IApplicationState): boolean {
    return state.uiState.headerOpacity;
}

