import { createSelector } from 'reselect';

import { NS_COMMISSION } from './constants';

const globalState = (state) => state[NS_COMMISSION];

export const selPi = createSelector(globalState, (state) => state.pi);
export const selPiLoading = createSelector(selPi, (state) => state.loading);
export const selHistoryCommission = createSelector(selPi, (state) => state.historyCommission);
export const selTotal = createSelector(selPi, (state) => state.total);
