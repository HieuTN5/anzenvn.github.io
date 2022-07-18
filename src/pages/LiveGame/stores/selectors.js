import { createSelector } from 'reselect';

import { NS_LIVE_GAME } from './constants';

const globalState = (state) => state[NS_LIVE_GAME];

export const selectorData = createSelector(globalState, (state) => state.data);
export const selectorListGame = createSelector(selectorData, (state) => state.listGame);
export const selectorSrcPlayGame = createSelector(selectorData, (state) => state.srcPlayGame);
