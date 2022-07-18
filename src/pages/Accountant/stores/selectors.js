import { createSelector } from 'reselect';

import { NS_ACCOUNTANT } from './constants';

const globalState = (state) => state[NS_ACCOUNTANT];
export const selPi = createSelector(globalState, state => state.pi);
export const selectorData = createSelector(globalState, (state) => state.data);
export const selectorDataBills = createSelector(selectorData, (state) => state.dataBills);
export const selectIsLoading = createSelector(selectorData, (state) => state.isLoading);
export const selectListOrderReady = createSelector(selectorData, (state) => state.listOrderReady);