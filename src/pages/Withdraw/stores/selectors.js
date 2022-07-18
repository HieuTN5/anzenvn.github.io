import { createSelector } from 'reselect';

import { NS_WITHDRAW } from './constants';

const globalState = (state) => state[NS_WITHDRAW];

export const selPi = createSelector(globalState, (state) => state.pi);
export const selPiLoading = createSelector(selPi, (state) => state.loading);
export const selHistoryWithdraw = createSelector(selPi, (state) => state.historyWithdraw);
export const selTotal = createSelector(selPi, (state) => state.total);
