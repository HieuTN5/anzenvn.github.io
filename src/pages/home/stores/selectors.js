import { createSelector } from 'reselect';

import { NS_HOME } from './constants';

const globalState = (state) => state[NS_HOME];
export const selPi = createSelector(globalState, state => state.pi);
export const selectorData = createSelector(globalState, (state) => state.data);
export const selectorListTopUsers = createSelector(selectorData, (state) => state.listTopUsers);
export const selectorDataOrders = createSelector(selectorData, (state) => state.dataOrders);
export const selectIsLoading = createSelector(selectorData, (state) => state.isLoading);
export const selectInfOrder = createSelector(selectorData, (state) => state.infOrder);