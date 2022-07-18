import { createSelector } from 'reselect';

import { NS_DEPOSIT } from './constants';

const globalState = (state) => state[NS_DEPOSIT];

export const selPi = createSelector(globalState, (state) => state.pi);
export const selPiLoading = createSelector(selPi, (state) => state.loading);
export const selHistoryDeposit = createSelector(selPi, (state) => state.historyDeposit);
export const selTotal = createSelector(selPi, (state) => state.total);
